import { query } from './config';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed Categories
    console.log('Seeding categories...');
    const categories = [
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronic devices',
        icon_name: 'Smartphone',
        color: 'from-brand-500 to-brand-600',
        display_order: 1,
      },
      {
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Everything for your home',
        icon_name: 'Home',
        color: 'from-accent-500 to-accent-600',
        display_order: 2,
      },
      {
        name: 'Audio',
        slug: 'audio',
        description: 'Premium audio equipment',
        icon_name: 'Headphones',
        color: 'from-success-500 to-success-600',
        display_order: 3,
      },
      {
        name: 'Photography',
        slug: 'photography',
        description: 'Cameras and photography equipment',
        icon_name: 'Camera',
        color: 'from-premium-500 to-premium-600',
        display_order: 4,
      },
      {
        name: 'Wearables',
        slug: 'wearables',
        description: 'Smart watches and fitness trackers',
        icon_name: 'Watch',
        color: 'from-warning-500 to-warning-600',
        display_order: 5,
      },
      {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        icon_name: 'Shirt',
        color: 'from-brand-700 to-brand-800',
        display_order: 6,
      },
    ];

    const categoryIds: Record<string, string> = {};
    for (const category of categories) {
      const result = await query(
        `INSERT INTO categories (name, slug, description, icon_name, color, display_order)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (slug) DO UPDATE SET 
           name = EXCLUDED.name,
           description = EXCLUDED.description,
           icon_name = EXCLUDED.icon_name,
           color = EXCLUDED.color,
           display_order = EXCLUDED.display_order
         RETURNING id`,
        [
          category.name,
          category.slug,
          category.description,
          category.icon_name,
          category.color,
          category.display_order,
        ]
      );
      categoryIds[category.slug] = result.rows[0].id;
    }

    // Seed Products
    console.log('Seeding products...');
    const products = [
      {
        name: 'Premium Wireless Headphones',
        slug: 'premium-wireless-headphones',
        description: 'Experience crystal-clear audio with active noise cancellation',
        short_description: 'Premium sound quality with ANC',
        price: 299.99,
        original_price: 399.99,
        discount: 25,
        category: 'audio',
        brand: 'AudioTech',
        sku: 'AT-WH-001',
        stock_quantity: 150,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        rating: 4.8,
        review_count: 245,
        is_featured: true,
        badge: 'Best Seller',
      },
      {
        name: 'Smart Watch Pro',
        slug: 'smart-watch-pro',
        description: 'Track your fitness and stay connected',
        short_description: 'Advanced fitness tracking',
        price: 399.99,
        original_price: 499.99,
        discount: 20,
        category: 'wearables',
        brand: 'TechWear',
        sku: 'TW-SW-002',
        stock_quantity: 200,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        rating: 4.6,
        review_count: 189,
        is_featured: true,
        badge: 'Hot Deal',
      },
      {
        name: 'Professional DSLR Camera',
        slug: 'professional-dslr-camera',
        description: 'Capture stunning photos with 24MP sensor',
        short_description: '24MP Full Frame DSLR',
        price: 1299.99,
        category: 'photography',
        brand: 'PhotoPro',
        sku: 'PP-CAM-003',
        stock_quantity: 50,
        image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
        rating: 4.9,
        review_count: 342,
        is_featured: true,
        badge: 'Trending',
      },
      {
        name: 'Smartphone Ultra 5G',
        slug: 'smartphone-ultra-5g',
        description: 'Latest flagship with advanced AI features',
        short_description: 'Flagship 5G smartphone',
        price: 899.99,
        original_price: 1099.99,
        discount: 18,
        category: 'electronics',
        brand: 'MobileTech',
        sku: 'MT-SM-004',
        stock_quantity: 300,
        image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        rating: 4.7,
        review_count: 512,
        is_featured: true,
        badge: 'New',
      },
      {
        name: 'Luxury Designer Watch',
        slug: 'luxury-designer-watch',
        description: 'Elegant timepiece with Swiss movement',
        short_description: 'Swiss-made luxury watch',
        price: 2499.99,
        category: 'wearables',
        brand: 'LuxTime',
        sku: 'LT-LW-005',
        stock_quantity: 25,
        image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
        rating: 4.9,
        review_count: 78,
        is_featured: false,
        badge: null,
      },
      {
        name: 'Gaming Laptop Elite',
        slug: 'gaming-laptop-elite',
        description: 'High-performance gaming with RTX graphics',
        short_description: 'RTX 4080 Gaming Laptop',
        price: 1899.99,
        original_price: 2299.99,
        discount: 17,
        category: 'electronics',
        brand: 'GameForce',
        sku: 'GF-GL-006',
        stock_quantity: 75,
        image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        rating: 4.8,
        review_count: 198,
        is_featured: true,
        badge: 'Hot Deal',
      },
      {
        name: 'Wireless Charging Pad',
        slug: 'wireless-charging-pad',
        description: 'Fast wireless charging for all devices',
        short_description: '15W Fast Wireless Charger',
        price: 39.99,
        category: 'electronics',
        brand: 'ChargeFast',
        sku: 'CF-WCP-007',
        stock_quantity: 500,
        image_url: 'https://images.unsplash.com/photo-1591290619762-c01ccec1d2a8?w=500',
        rating: 4.5,
        review_count: 321,
        is_featured: false,
        badge: 'Best Seller',
      },
      {
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-t-shirt',
        description: '100% organic cotton, perfect fit',
        short_description: 'Organic cotton tee',
        price: 29.99,
        category: 'fashion',
        brand: 'EcoWear',
        sku: 'EW-TS-008',
        stock_quantity: 1000,
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        rating: 4.4,
        review_count: 456,
        is_featured: false,
        badge: null,
      },
    ];

    for (const product of products) {
      await query(
        `INSERT INTO products 
         (name, slug, description, short_description, price, original_price, discount, 
          category_id, brand, sku, stock_quantity, image_url, rating, review_count, 
          is_featured, badge)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
         ON CONFLICT (slug) DO NOTHING`,
        [
          product.name,
          product.slug,
          product.description,
          product.short_description,
          product.price,
          product.original_price || null,
          product.discount || 0,
          categoryIds[product.category],
          product.brand,
          product.sku,
          product.stock_quantity,
          product.image_url,
          product.rating,
          product.review_count,
          product.is_featured,
          product.badge,
        ]
      );
    }

    // Seed Admin User
    console.log('Seeding admin user...');
    const passwordHash = await bcrypt.hash('admin123', 10);
    await query(
      `INSERT INTO users 
       (email, password_hash, first_name, last_name, role, email_verified)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING`,
      ['admin@ecommerce.com', passwordHash, 'Admin', 'User', 'admin', true]
    );

    // Seed Test Customer
    console.log('Seeding test customer...');
    const customerPasswordHash = await bcrypt.hash('customer123', 10);
    await query(
      `INSERT INTO users 
       (email, password_hash, first_name, last_name, role, email_verified)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING`,
      [
        'customer@example.com',
        customerPasswordHash,
        'John',
        'Doe',
        'customer',
        true,
      ]
    );

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    throw error;
  }
};
