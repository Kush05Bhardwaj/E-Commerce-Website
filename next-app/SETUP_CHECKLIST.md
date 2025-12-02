# ✅ PostgreSQL Integration Checklist

Use this checklist to set up your PostgreSQL database and verify everything works correctly.

## 📋 Setup Checklist

### Step 1: Database Provider ☐
Choose ONE option and complete:

- [ ] **Option A: Local PostgreSQL**
  - [ ] Install PostgreSQL 14+
  - [ ] Start PostgreSQL service
  - [ ] Create `ecommerce_db` database
  - [ ] Note username and password

- [ ] **Option B: Supabase (Recommended)**
  - [ ] Create free account at https://supabase.com
  - [ ] Create new project
  - [ ] Copy connection string from Settings → Database
  - [ ] Save connection string

- [ ] **Option C: Neon**
  - [ ] Create free account at https://neon.tech
  - [ ] Create new project
  - [ ] Copy connection string
  - [ ] Save connection string

### Step 2: Environment Configuration ☐

- [ ] Open `.env.local` file
- [ ] Update `DATABASE_URL` with your connection string
- [ ] Verify format matches your chosen provider
- [ ] Save file

Example formats:
```env
# Local
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce_db

# Supabase
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Neon
DATABASE_URL=postgresql://[user]:[password]@[hostname]/[database]?sslmode=require
```

### Step 3: Install Dependencies ☐

- [x] **Already completed!** `pg` and `@types/pg` are installed

### Step 4: Start Development Server ☐

```powershell
npm run dev
```

- [ ] Server starts without errors
- [ ] Accessible at http://localhost:3000
- [ ] No connection errors in console

### Step 5: Initialize Database ☐

Choose ONE method:

**Method A: Using API (Recommended)**
```powershell
# In PowerShell or use Postman/browser
curl -X POST http://localhost:3000/api/db/init
```

**Method B: Using npm scripts**
```powershell
npm run db:init
```

- [ ] Command runs successfully
- [ ] See "✅ Database initialized successfully" message
- [ ] No errors in output

### Step 6: Seed Sample Data ☐

Choose ONE method:

**Method A: Using API (Recommended)**
```powershell
curl -X POST http://localhost:3000/api/db/seed
```

**Method B: Using npm scripts**
```powershell
npm run db:seed
```

- [ ] Command runs successfully
- [ ] See "✅ Database seeded successfully" message
- [ ] Sample data created (8 products, 6 categories, 2 users)

### Step 7: Verify Installation ☐

**Test 1: Health Check**
```powershell
curl http://localhost:3000/api/health
```
- [ ] Status: "ok"
- [ ] Database: "healthy"
- [ ] No errors

**Test 2: Get Products**
```powershell
curl http://localhost:3000/api/products
```
- [ ] Returns array of 8 products
- [ ] Each product has name, price, description
- [ ] No errors

**Test 3: Get Categories**
```powershell
curl http://localhost:3000/api/categories
```
- [ ] Returns array of 6 categories
- [ ] Each category has name, slug, icon_name
- [ ] No errors

**Test 4: Browse Website**
- [ ] Open http://localhost:3000
- [ ] Homepage loads correctly
- [ ] All sections visible (Hero, Categories, Products, etc.)
- [ ] No console errors

### Step 8: Test User Accounts ☐

**Admin Account:**
- [ ] Email: `admin@ecommerce.com`
- [ ] Password: `admin123`
- [ ] Account exists in database

**Customer Account:**
- [ ] Email: `customer@example.com`
- [ ] Password: `customer123`
- [ ] Account exists in database

### Step 9: Documentation Review ☐

- [ ] Read `DATABASE_SETUP.md` for detailed instructions
- [ ] Review `POSTGRESQL_INTEGRATION.md` for features
- [ ] Check `ARCHITECTURE.md` for system overview
- [ ] Keep `PG_INTEGRATION_SUMMARY.md` as quick reference

## 🔍 Verification Commands

Run these to verify everything is working:

```powershell
# 1. Check database health
curl http://localhost:3000/api/health

# 2. Get all products
curl http://localhost:3000/api/products

# 3. Get featured products
curl "http://localhost:3000/api/products?featured=true"

# 4. Search products
curl "http://localhost:3000/api/products?search=headphones"

# 5. Get categories
curl http://localhost:3000/api/categories

# 6. Get cart (empty for new user)
curl http://localhost:3000/api/cart
```

## 🐛 Troubleshooting Checklist

If something doesn't work:

- [ ] Verify DATABASE_URL is correct in `.env.local`
- [ ] Ensure PostgreSQL service is running
- [ ] Check for typos in connection string
- [ ] Verify database exists
- [ ] Check firewall isn't blocking port 5432 (local)
- [ ] Review console logs for specific errors
- [ ] Try restarting dev server
- [ ] Re-run initialization if tables missing

## 📊 Database Verification (Optional)

If you have `psql` or pgAdmin:

```sql
-- Connect to database
psql [YOUR_DATABASE_URL]

-- Check tables exist
\dt

-- Count products
SELECT COUNT(*) FROM products;

-- Count categories
SELECT COUNT(*) FROM categories;

-- Count users
SELECT COUNT(*) FROM users;

-- View sample product
SELECT name, price, brand FROM products LIMIT 1;
```

Expected results:
- [ ] 15+ tables exist
- [ ] 8 products
- [ ] 6 categories
- [ ] 2 users

## 🎯 Next Steps After Setup

Once everything is working:

- [ ] Explore API endpoints with Postman
- [ ] Review repository code in `src/lib/db/repositories/`
- [ ] Understand schema in `schema.sql`
- [ ] Test adding products via API
- [ ] Test cart functionality
- [ ] Test order creation
- [ ] Plan authentication integration
- [ ] Plan payment integration
- [ ] Consider adding more features

## 📚 Quick Reference

**Key Files:**
- `src/lib/db/config.ts` - Database connection
- `src/lib/db/schema.sql` - Database schema
- `src/lib/db/repositories/` - Data access layer
- `src/app/api/` - API endpoints
- `src/lib/api/client.ts` - Frontend API client

**Key Commands:**
```powershell
npm run dev          # Start server
npm run db:init      # Initialize database
npm run db:seed      # Seed sample data
npm run db:reset     # Reset & seed
```

**Key URLs:**
- http://localhost:3000 - Website
- http://localhost:3000/api/health - Health check
- http://localhost:3000/api/products - Products API
- http://localhost:3000/api/categories - Categories API

## ✅ Success Criteria

You've successfully set up PostgreSQL when:

✅ Database connection is healthy
✅ All API endpoints return data
✅ Sample products appear in database
✅ Website loads without errors
✅ Console shows no connection errors
✅ Health check returns "healthy"

## 🎉 Completion

- [ ] All setup steps completed
- [ ] All verification tests passed
- [ ] Documentation reviewed
- [ ] Ready to build features!

---

**Need Help?**
1. Check `DATABASE_SETUP.md` for detailed troubleshooting
2. Review error messages in console
3. Verify environment variables
4. Test connection with `/api/health`

**Congratulations! Your PostgreSQL database is ready! 🚀**
