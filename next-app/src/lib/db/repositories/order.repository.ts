import { query, getClient } from '../config';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  product_sku?: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  attributes?: any;
  created_at: Date;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  status: string;
  payment_status: string;
  payment_method?: string;
  payment_id?: string;
  subtotal: number;
  discount: number;
  tax: number;
  shipping_cost: number;
  total: number;
  currency: string;
  shipping_address_id?: string;
  billing_address_id?: string;
  notes?: string;
  tracking_number?: string;
  shipped_at?: Date;
  delivered_at?: Date;
  cancelled_at?: Date;
  created_at: Date;
  updated_at: Date;
  items?: OrderItem[];
}

export class OrderRepository {
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  async findAll(options: {
    limit?: number;
    offset?: number;
    userId?: string;
    status?: string;
  } = {}): Promise<{ orders: Order[]; total: number }> {
    const { limit = 20, offset = 0, userId, status } = options;

    let whereConditions: string[] = [];
    let params: any[] = [];
    let paramCount = 0;

    if (userId) {
      whereConditions.push(`user_id = $${++paramCount}`);
      params.push(userId);
    }

    if (status) {
      whereConditions.push(`status = $${++paramCount}`);
      params.push(status);
    }

    const whereClause =
      whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const countQuery = `SELECT COUNT(*) as total FROM orders ${whereClause}`;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    const ordersQuery = `
      SELECT * FROM orders 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${++paramCount} OFFSET $${++paramCount}
    `;
    params.push(limit, offset);

    const result = await query(ordersQuery, params);

    return {
      orders: result.rows,
      total,
    };
  }

  async findById(id: string): Promise<Order | null> {
    const result = await query(
      `SELECT o.*,
              json_agg(
                json_build_object(
                  'id', oi.id,
                  'product_id', oi.product_id,
                  'product_name', oi.product_name,
                  'product_sku', oi.product_sku,
                  'quantity', oi.quantity,
                  'price', oi.price,
                  'discount', oi.discount,
                  'total', oi.total,
                  'attributes', oi.attributes
                )
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.id = $1
       GROUP BY o.id`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const result = await query(
      `SELECT o.*,
              json_agg(
                json_build_object(
                  'id', oi.id,
                  'product_id', oi.product_id,
                  'product_name', oi.product_name,
                  'product_sku', oi.product_sku,
                  'quantity', oi.quantity,
                  'price', oi.price,
                  'discount', oi.discount,
                  'total', oi.total,
                  'attributes', oi.attributes
                )
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.order_number = $1
       GROUP BY o.id`,
      [orderNumber]
    );
    return result.rows[0] || null;
  }

  async create(
    orderData: {
      user_id?: string;
      payment_method?: string;
      subtotal: number;
      discount?: number;
      tax?: number;
      shipping_cost?: number;
      total: number;
      shipping_address_id?: string;
      billing_address_id?: string;
      notes?: string;
    },
    items: Array<{
      product_id: string;
      product_name: string;
      product_sku?: string;
      quantity: number;
      price: number;
      discount?: number;
      attributes?: any;
    }>
  ): Promise<Order> {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      const orderNumber = this.generateOrderNumber();

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders 
         (order_number, user_id, payment_method, subtotal, discount, tax, 
          shipping_cost, total, shipping_address_id, billing_address_id, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [
          orderNumber,
          orderData.user_id || null,
          orderData.payment_method || null,
          orderData.subtotal,
          orderData.discount || 0,
          orderData.tax || 0,
          orderData.shipping_cost || 0,
          orderData.total,
          orderData.shipping_address_id || null,
          orderData.billing_address_id || null,
          orderData.notes || null,
        ]
      );

      const order = orderResult.rows[0];

      // Create order items
      for (const item of items) {
        const itemTotal = item.quantity * item.price - (item.discount || 0);
        await client.query(
          `INSERT INTO order_items 
           (order_id, product_id, product_name, product_sku, quantity, price, discount, total, attributes)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            order.id,
            item.product_id,
            item.product_name,
            item.product_sku || null,
            item.quantity,
            item.price,
            item.discount || 0,
            itemTotal,
            item.attributes ? JSON.stringify(item.attributes) : null,
          ]
        );

        // Update product stock
        await client.query(
          'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }

      await client.query('COMMIT');

      return await this.findById(order.id) as Order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async updateStatus(
    id: string,
    status: string,
    additionalData?: {
      tracking_number?: string;
      shipped_at?: Date;
      delivered_at?: Date;
      cancelled_at?: Date;
    }
  ): Promise<Order | null> {
    const fields = ['status = $1'];
    const values: any[] = [status];
    let paramCount = 1;

    if (additionalData?.tracking_number) {
      fields.push(`tracking_number = $${++paramCount}`);
      values.push(additionalData.tracking_number);
    }

    if (additionalData?.shipped_at) {
      fields.push(`shipped_at = $${++paramCount}`);
      values.push(additionalData.shipped_at);
    }

    if (additionalData?.delivered_at) {
      fields.push(`delivered_at = $${++paramCount}`);
      values.push(additionalData.delivered_at);
    }

    if (additionalData?.cancelled_at) {
      fields.push(`cancelled_at = $${++paramCount}`);
      values.push(additionalData.cancelled_at);
    }

    values.push(id);

    const result = await query(
      `UPDATE orders SET ${fields.join(', ')} WHERE id = $${++paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: string,
    paymentId?: string
  ): Promise<Order | null> {
    const result = await query(
      'UPDATE orders SET payment_status = $1, payment_id = $2 WHERE id = $3 RETURNING *',
      [paymentStatus, paymentId || null, id]
    );
    return result.rows[0] || null;
  }

  async getOrderStats(userId?: string): Promise<{
    total_orders: number;
    total_spent: number;
    pending_orders: number;
    completed_orders: number;
  }> {
    const whereClause = userId ? 'WHERE user_id = $1' : '';
    const params = userId ? [userId] : [];

    const result = await query(
      `SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total), 0) as total_spent,
        COUNT(*) FILTER (WHERE status IN ('pending', 'processing')) as pending_orders,
        COUNT(*) FILTER (WHERE status = 'delivered') as completed_orders
       FROM orders
       ${whereClause}`,
      params
    );

    return result.rows[0];
  }
}

export const orderRepository = new OrderRepository();
