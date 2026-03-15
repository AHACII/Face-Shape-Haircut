
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  face_shape text NOT NULL CHECK (face_shape IN ('Round', 'Square', 'Oval', 'Heart', 'Oblong', 'Diamond')),
  confidence numeric DEFAULT 0 CHECK (confidence >= 0 AND confidence <= 1),
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read customers"
  ON customers
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert customers"
  ON customers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update customers"
  ON customers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete customers"
  ON customers
  FOR DELETE
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at DESC);
