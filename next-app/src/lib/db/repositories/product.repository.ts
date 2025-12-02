import { query } from '../config';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  original_price?: number;
  discount?: number;
  category_id?: string;
  brand?: string;
  sku?: string;
  stock_quantity: number;
  low_stock_threshold: number;
  image_url?: string;
  images?: string[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_active: boolean;
  badge?: string;
  created_at: Date;
  updated_at: Date;
}

export class ProductRepository {
  async findAll(options: {
    limit?: number;
    offset?: number;
    categoryId?: string;
    isFeatured?: boolean;
    isActive?: boolean;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  } = {}): Promise<{ products: Product[]; total: number }> {
    const {
      limit = 20,
      offset = 0,
      categoryId,
      isFeatured,
      isActive = true,
      search,
      minPrice,
      maxPrice,
      sortBy = 'created_at',
      sortOrder = 'DESC',
    } = options;

    let whereConditions: string[] = [];
    let params: any[] = [];
    let paramCount = 0;

    if (isActive !== undefined) {
      whereConditions.push(`is_active = $${++paramCount}`);
      params.push(isActive);
    }

    if (categoryId) {
      whereConditions.push(`category_id = $${++paramCount}`);
      params.push(categoryId);
    }

    if (isFeatured !== undefined) {
      whereConditions.push(`is_featured = $${++paramCount}`);
      params.push(isFeatured);
    }

    if (search) {
      whereConditions.push(
        `(name ILIKE $${++paramCount} OR description ILIKE $${paramCount})`
      );
      params.push(`%${search}%`);
    }

    if (minPrice !== undefined) {
      whereConditions.push(`price >= $${++paramCount}`);
      params.push(minPrice);
    }

    if (maxPrice !== undefined) {
      whereConditions.push(`price <= $${++paramCount}`);
      params.push(maxPrice);
    }

    const whereClause =
      whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM products ${whereClause}`;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get products
    const productsQuery = `
      SELECT * FROM products 
      ${whereClause} 
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${++paramCount} OFFSET $${++paramCount}
    `;
    params.push(limit, offset);

    const result = await query(productsQuery, params);

    return {
      products: result.rows,
      total,
    };
  }

  async findById(id: string): Promise<Product | null> {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const result = await query('SELECT * FROM products WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  async create(product: Partial<Product>): Promise<Product> {
    const {
      name,
      slug,
      description,
      short_description,
      price,
      original_price,
      discount,
      category_id,
      brand,
      sku,
      stock_quantity = 0,
      low_stock_threshold = 10,
      image_url,
      images,
      is_featured = false,
      is_active = true,
      badge,
    } = product;

    const result = await query(
      `INSERT INTO products 
      (name, slug, description, short_description, price, original_price, discount, 
       category_id, brand, sku, stock_quantity, low_stock_threshold, image_url, images, 
       is_featured, is_active, badge)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
      [
        name,
        slug,
        description,
        short_description,
        price,
        original_price,
        discount,
        category_id,
        brand,
        sku,
        stock_quantity,
        low_stock_threshold,
        image_url,
        images,
        is_featured,
        is_active,
        badge,
      ]
    );

    return result.rows[0];
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    Object.entries(product).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = $${++paramCount}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const updateQuery = `
      UPDATE products 
      SET ${fields.join(', ')} 
      WHERE id = $${++paramCount}
      RETURNING *
    `;

    const result = await query(updateQuery, values);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM products WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async updateStock(id: string, quantity: number): Promise<Product | null> {
    const result = await query(
      'UPDATE products SET stock_quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return result.rows[0] || null;
  }

  async updateRating(productId: string): Promise<void> {
    await query(
      `UPDATE products 
       SET rating = (
         SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE product_id = $1
       ),
       review_count = (
         SELECT COUNT(*) FROM reviews WHERE product_id = $1
       )
       WHERE id = $1`,
      [productId]
    );
  }
}

export const productRepository = new ProductRepository();
