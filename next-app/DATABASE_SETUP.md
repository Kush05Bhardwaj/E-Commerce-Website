# PostgreSQL Database Setup Guide

This e-commerce platform uses PostgreSQL as its primary database. This guide will help you set up and configure the database.

## 📋 Prerequisites

- PostgreSQL 14+ installed locally OR use a cloud provider:
  - [Supabase](https://supabase.com/) (Recommended - Free tier available)
  - [Neon](https://neon.tech/) (Serverless PostgreSQL)
  - [Railway](https://railway.app/)
  - [Heroku Postgres](https://www.heroku.com/postgres)

## 🚀 Quick Start

### Option 1: Using Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # Windows (using Chocolatey)
   choco install postgresql

   # macOS (using Homebrew)
   brew install postgresql@14

   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Start PostgreSQL service**:
   ```bash
   # Windows
   net start postgresql

   # macOS
   brew services start postgresql@14

   # Ubuntu/Debian
   sudo systemctl start postgresql
   ```

3. **Create database**:
   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE ecommerce_db;

   # Create user (optional)
   CREATE USER ecommerce_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

   # Exit
   \q
   ```

4. **Update .env.local**:
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/ecommerce_db
   ```

### Option 2: Using Supabase (Recommended)

1. Go to [Supabase](https://supabase.com/) and create a free account
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection String** (URI mode)
5. Update `.env.local`:
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

### Option 3: Using Neon

1. Go to [Neon](https://neon.tech/) and create a free account
2. Create a new project
3. Copy the connection string
4. Update `.env.local`:
   ```env
   DATABASE_URL=postgresql://[user]:[password]@[hostname]/[database]?sslmode=require
   ```

## 📦 Installation & Setup

1. **Install dependencies** (already done):
   ```bash
   npm install pg @types/pg
   ```

2. **Initialize the database**:
   ```bash
   # Make a POST request to initialize tables
   curl -X POST http://localhost:3000/api/db/init
   ```

   Or use the browser/Postman to send a POST request to:
   ```
   http://localhost:3000/api/db/init
   ```

3. **Seed the database with sample data**:
   ```bash
   # Make a POST request to seed data
   curl -X POST http://localhost:3000/api/db/seed
   ```

   Or use the browser/Postman to send a POST request to:
   ```
   http://localhost:3000/api/db/seed
   ```

## 📊 Database Schema

The database includes the following tables:

### Core Tables
- **users** - User accounts and authentication
- **products** - Product catalog
- **categories** - Product categories
- **cart** - Shopping carts
- **cart_items** - Items in shopping carts
- **orders** - Customer orders
- **order_items** - Items in orders

### Additional Tables
- **addresses** - Shipping and billing addresses
- **reviews** - Product reviews and ratings
- **wishlist** - User wishlists
- **product_attributes** - Product variants (size, color, etc.)
- **coupons** - Discount coupons
- **newsletter_subscribers** - Newsletter subscriptions

## 🔧 Database Management

### Using psql (PostgreSQL CLI)

```bash
# Connect to database
psql postgresql://username:password@localhost:5432/ecommerce_db

# List all tables
\dt

# Describe a table
\d products

# View all products
SELECT * FROM products;

# Exit
\q
```

### Using pgAdmin

1. Download and install [pgAdmin](https://www.pgadmin.org/)
2. Connect to your PostgreSQL server
3. Browse and manage your database visually

### Using Supabase Dashboard

If using Supabase, you can use their built-in Table Editor and SQL Editor for database management.

## 🔍 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart?itemId=[id]` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/[id]` - Get single order
- `POST /api/orders` - Create order
- `PATCH /api/orders/[id]` - Update order status (admin)

### Database Management
- `GET /api/health` - Check database health
- `POST /api/db/init` - Initialize database (dev only)
- `POST /api/db/seed` - Seed database (dev only)

## 🧪 Testing the Database

1. **Check database health**:
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Get products**:
   ```bash
   curl http://localhost:3000/api/products
   ```

3. **Get categories**:
   ```bash
   curl http://localhost:3000/api/categories
   ```

## 🛠️ Troubleshooting

### Connection Issues

**Error: "Connection refused"**
- Ensure PostgreSQL is running
- Check that the port (5432) is correct
- Verify firewall settings

**Error: "password authentication failed"**
- Check username and password in DATABASE_URL
- Ensure the user has proper permissions

### Schema Issues

**Error: "relation does not exist"**
- Run the initialization endpoint: `POST /api/db/init`
- Check that all migrations have been applied

### Performance Issues

**Slow queries**
- Check that indexes are created (they're included in schema.sql)
- Use `EXPLAIN ANALYZE` to debug slow queries
- Consider connection pooling settings

## 📝 Sample Data

After seeding, you'll have:
- 8 sample products across different categories
- 6 product categories
- 2 test users:
  - Admin: `admin@ecommerce.com` / `admin123`
  - Customer: `customer@example.com` / `customer123`

## 🔐 Security Best Practices

1. **Never commit .env.local** to version control
2. **Use strong passwords** for production databases
3. **Enable SSL** for production connections
4. **Limit database user permissions** to only what's needed
5. **Regularly backup** your database
6. **Use connection pooling** for better performance

## 🚀 Production Deployment

For production:

1. Use a managed PostgreSQL service (Supabase, Neon, AWS RDS, etc.)
2. Enable SSL connections
3. Set up automated backups
4. Configure connection pooling
5. Update DATABASE_URL with production credentials
6. Never expose /api/db/init or /api/db/seed endpoints in production

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg) Documentation](https://node-postgres.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Neon Documentation](https://neon.tech/docs/introduction)

## 🐛 Common Commands

```sql
-- View all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Count products
SELECT COUNT(*) FROM products;

-- View product categories with counts
SELECT c.name, COUNT(p.id) as product_count 
FROM categories c 
LEFT JOIN products p ON c.id = p.category_id 
GROUP BY c.id, c.name;

-- Clear all data (careful!)
TRUNCATE users, products, categories, cart, cart_items, 
         orders, order_items, reviews, wishlist, addresses 
CASCADE;

-- Drop all tables (very careful!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```
