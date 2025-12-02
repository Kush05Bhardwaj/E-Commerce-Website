import { query } from '../config';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon_name?: string;
  color?: string;
  parent_id?: string;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  product_count?: number;
}

export class CategoryRepository {
  async findAll(includeInactive: boolean = false): Promise<Category[]> {
    const whereClause = includeInactive ? '' : 'WHERE is_active = true';
    
    const result = await query(
      `SELECT c.*,
              COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
       ${whereClause}
       GROUP BY c.id
       ORDER BY c.display_order ASC, c.name ASC`
    );
    
    return result.rows;
  }

  async findById(id: string): Promise<Category | null> {
    const result = await query(
      `SELECT c.*,
              COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
       WHERE c.id = $1
       GROUP BY c.id`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const result = await query(
      `SELECT c.*,
              COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
       WHERE c.slug = $1
       GROUP BY c.id`,
      [slug]
    );
    return result.rows[0] || null;
  }

  async create(category: {
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
    icon_name?: string;
    color?: string;
    parent_id?: string;
    display_order?: number;
    is_active?: boolean;
  }): Promise<Category> {
    const result = await query(
      `INSERT INTO categories 
       (name, slug, description, image_url, icon_name, color, parent_id, display_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        category.name,
        category.slug,
        category.description || null,
        category.image_url || null,
        category.icon_name || null,
        category.color || null,
        category.parent_id || null,
        category.display_order || 0,
        category.is_active !== undefined ? category.is_active : true,
      ]
    );
    return result.rows[0];
  }

  async update(id: string, category: Partial<Category>): Promise<Category | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    Object.entries(category).forEach(([key, value]) => {
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
      UPDATE categories 
      SET ${fields.join(', ')} 
      WHERE id = $${++paramCount}
      RETURNING *
    `;

    const result = await query(updateQuery, values);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM categories WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}

export const categoryRepository = new CategoryRepository();
