import { query } from '../config';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  email_verified: boolean;
  role: 'customer' | 'admin' | 'seller';
  provider?: string;
  provider_id?: string;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}

export class UserRepository {
  async findAll(options: {
    limit?: number;
    offset?: number;
    role?: string;
  } = {}): Promise<{ users: User[]; total: number }> {
    const { limit = 50, offset = 0, role } = options;

    let whereClause = '';
    const params: any[] = [];

    if (role) {
      whereClause = 'WHERE role = $1';
      params.push(role);
    }

    const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause}`;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    const usersQuery = `
      SELECT id, email, first_name, last_name, phone, avatar_url, 
             email_verified, role, provider, created_at, updated_at, last_login
      FROM users 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    params.push(limit, offset);

    const result = await query(usersQuery, params);

    return {
      users: result.rows,
      total,
    };
  }

  async findById(id: string): Promise<User | null> {
    const result = await query(
      `SELECT id, email, first_name, last_name, phone, avatar_url, 
              email_verified, role, provider, created_at, updated_at, last_login
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async findByProvider(provider: string, providerId: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM users WHERE provider = $1 AND provider_id = $2',
      [provider, providerId]
    );
    return result.rows[0] || null;
  }

  async create(user: {
    email: string;
    password_hash?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
    email_verified?: boolean;
    role?: string;
    provider?: string;
    provider_id?: string;
  }): Promise<User> {
    const {
      email,
      password_hash,
      first_name,
      last_name,
      phone,
      avatar_url,
      email_verified = false,
      role = 'customer',
      provider,
      provider_id,
    } = user;

    const result = await query(
      `INSERT INTO users 
       (email, password_hash, first_name, last_name, phone, avatar_url, 
        email_verified, role, provider, provider_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, email, first_name, last_name, phone, avatar_url, 
                 email_verified, role, provider, created_at, updated_at`,
      [
        email,
        password_hash,
        first_name,
        last_name,
        phone,
        avatar_url,
        email_verified,
        role,
        provider,
        provider_id,
      ]
    );

    return result.rows[0];
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    Object.entries(user).forEach(([key, value]) => {
      if (
        value !== undefined &&
        key !== 'id' &&
        key !== 'created_at' &&
        key !== 'password_hash'
      ) {
        fields.push(`${key} = $${++paramCount}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const updateQuery = `
      UPDATE users 
      SET ${fields.join(', ')} 
      WHERE id = $${++paramCount}
      RETURNING id, email, first_name, last_name, phone, avatar_url, 
                email_verified, role, provider, created_at, updated_at, last_login
    `;

    const result = await query(updateQuery, values);
    return result.rows[0] || null;
  }

  async updatePassword(id: string, passwordHash: string): Promise<boolean> {
    const result = await query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [passwordHash, id]
    );
    return (result.rowCount ?? 0) > 0;
  }

  async updateLastLogin(id: string): Promise<void> {
    await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [
      id,
    ]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async verifyEmail(id: string): Promise<boolean> {
    const result = await query(
      'UPDATE users SET email_verified = true WHERE id = $1',
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  }
}

export const userRepository = new UserRepository();
