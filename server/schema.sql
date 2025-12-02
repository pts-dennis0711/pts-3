-- Admin Users
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE, -- e.g. '3d-pdf-exporter'
  name TEXT NOT NULL, -- e.g. '3D PDF Exporter'
  category_slug TEXT NOT NULL, -- e.g. 'autocad'
  description TEXT,
  compatibility TEXT,
  plugin_updates TEXT,
  autodesk_store_link TEXT,
  download_url TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Pricing Tiers
CREATE TABLE IF NOT EXISTS product_pricing (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL, -- 'trial', 'locked-single', 'locked-two', 'transferable', 'automation'
  price TEXT, -- '$99'
  description TEXT,
  cta_text TEXT,
  features JSONB, -- Array of strings
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Features
CREATE TABLE IF NOT EXISTS product_features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- 'Sparkles', 'Zap', etc.
  display_order INTEGER DEFAULT 0
);

-- Product Testimonials
CREATE TABLE IF NOT EXISTS product_testimonials (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  display_order INTEGER DEFAULT 0
);

-- Product FAQs
CREATE TABLE IF NOT EXISTS product_faqs (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- Product Version History
CREATE TABLE IF NOT EXISTS product_versions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  version_number TEXT NOT NULL,
  release_date DATE,
  changes JSONB -- Array of strings
);
