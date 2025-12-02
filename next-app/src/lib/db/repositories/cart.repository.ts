import { query, getClient } from '../config';

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price: number;
  attributes?: any;
  created_at: Date;
  updated_at: Date;
  // Joined fields from product
  product_name?: string;
  product_image?: string;
  product_stock?: number;
}

export interface Cart {
  id: string;
  user_id?: string;
  session_id?: string;
  created_at: Date;
  updated_at: Date;
  items?: CartItem[];
}

export class CartRepository {
  async findByUserId(userId: string): Promise<Cart | null> {
    const result = await query(
      `SELECT c.*, 
              json_agg(
                json_build_object(
                  'id', ci.id,
                  'product_id', ci.product_id,
                  'quantity', ci.quantity,
                  'price', ci.price,
                  'attributes', ci.attributes,
                  'product_name', p.name,
                  'product_image', p.image_url,
                  'product_stock', p.stock_quantity
                )
              ) FILTER (WHERE ci.id IS NOT NULL) as items
       FROM cart c
       LEFT JOIN cart_items ci ON c.id = ci.cart_id
       LEFT JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = $1
       GROUP BY c.id`,
      [userId]
    );
    return result.rows[0] || null;
  }

  async findBySessionId(sessionId: string): Promise<Cart | null> {
    const result = await query(
      `SELECT c.*, 
              json_agg(
                json_build_object(
                  'id', ci.id,
                  'product_id', ci.product_id,
                  'quantity', ci.quantity,
                  'price', ci.price,
                  'attributes', ci.attributes,
                  'product_name', p.name,
                  'product_image', p.image_url,
                  'product_stock', p.stock_quantity
                )
              ) FILTER (WHERE ci.id IS NOT NULL) as items
       FROM cart c
       LEFT JOIN cart_items ci ON c.id = ci.cart_id
       LEFT JOIN products p ON ci.product_id = p.id
       WHERE c.session_id = $1
       GROUP BY c.id`,
      [sessionId]
    );
    return result.rows[0] || null;
  }

  async createCart(userId?: string, sessionId?: string): Promise<Cart> {
    const result = await query(
      'INSERT INTO cart (user_id, session_id) VALUES ($1, $2) RETURNING *',
      [userId || null, sessionId || null]
    );
    return result.rows[0];
  }

  async addItem(
    cartId: string,
    productId: string,
    quantity: number,
    price: number,
    attributes?: any
  ): Promise<CartItem> {
    const result = await query(
      `INSERT INTO cart_items (cart_id, product_id, quantity, price, attributes)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (cart_id, product_id, attributes)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
       RETURNING *`,
      [cartId, productId, quantity, price, attributes ? JSON.stringify(attributes) : null]
    );
    return result.rows[0];
  }

  async updateItemQuantity(itemId: string, quantity: number): Promise<CartItem | null> {
    if (quantity <= 0) {
      await query('DELETE FROM cart_items WHERE id = $1', [itemId]);
      return null;
    }

    const result = await query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, itemId]
    );
    return result.rows[0] || null;
  }

  async removeItem(itemId: string): Promise<boolean> {
    const result = await query('DELETE FROM cart_items WHERE id = $1', [itemId]);
    return (result.rowCount ?? 0) > 0;
  }

  async clearCart(cartId: string): Promise<boolean> {
    const result = await query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
    return (result.rowCount ?? 0) > 0;
  }

  async getCartTotal(cartId: string): Promise<number> {
    const result = await query(
      `SELECT COALESCE(SUM(quantity * price), 0) as total
       FROM cart_items
       WHERE cart_id = $1`,
      [cartId]
    );
    return parseFloat(result.rows[0].total);
  }

  async mergeGuestCart(guestSessionId: string, userId: string): Promise<void> {
    const client = await getClient();
    
    try {
      await client.query('BEGIN');

      // Get or create user cart
      let userCart = await this.findByUserId(userId);
      if (!userCart) {
        userCart = await this.createCart(userId);
      }

      // Get guest cart
      const guestCart = await this.findBySessionId(guestSessionId);
      if (!guestCart) {
        await client.query('COMMIT');
        return;
      }

      // Move items from guest cart to user cart
      await client.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity, price, attributes)
         SELECT $1, product_id, quantity, price, attributes
         FROM cart_items
         WHERE cart_id = $2
         ON CONFLICT (cart_id, product_id, attributes)
         DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
        [userCart.id, guestCart.id]
      );

      // Delete guest cart
      await client.query('DELETE FROM cart WHERE id = $1', [guestCart.id]);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

export const cartRepository = new CartRepository();
