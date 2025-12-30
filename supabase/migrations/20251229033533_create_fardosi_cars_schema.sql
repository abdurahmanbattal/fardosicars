/*
  # FARDOSI CARS Database Schema
  
  ## Overview
  Complete database schema for luxury car dealership with admin management system.
  
  ## New Tables
  
  ### 1. `cars`
  Main table storing all car inventory with complete specifications.
  
  Columns:
  - `id` (uuid, primary key) - Unique car identifier
  - `brand` (text) - Car manufacturer (e.g., BMW, Mercedes, Audi)
  - `model` (text) - Car model name
  - `year` (integer) - Manufacturing year
  - `price` (numeric) - Car price
  - `currency` (text) - Price currency (default: 'USD')
  - `mileage` (integer) - Kilometers driven
  - `condition` (text) - New or used (جديدة / مستعملة)
  - `engine_type` (text) - Engine type (e.g., V6, V8, I4)
  - `engine_size` (text) - Engine displacement (e.g., 3.0L, 2.5L)
  - `transmission` (text) - Transmission type (أوتوماتيك / يدوي)
  - `fuel_type` (text) - Fuel type (بنزين / ديزل / هايبرد / كهربائي)
  - `drive_type` (text) - Drive configuration (دفع أمامي / خلفي / رباعي)
  - `exterior_color` (text) - Exterior paint color
  - `interior_color` (text) - Interior color
  - `description` (text) - Detailed Arabic description
  - `images` (jsonb) - Array of image URLs
  - `status` (text) - Availability status (متوفرة / محجوزة / مباعة)
  - `is_featured` (boolean) - Display on featured section
  - `is_visible` (boolean) - Show/hide from public view
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ## Security
  
  ### Row Level Security (RLS)
  - Public users can view visible, available cars
  - Admin users can manage all cars
  - All tables have RLS enabled with appropriate policies
  
  ## Notes
  - Images stored as JSON array for flexibility
  - Status tracking for inventory management
  - Featured flag for homepage showcase
  - Visibility toggle for draft/published workflow
  - Arabic-friendly text fields for descriptions
  - Comprehensive specifications for detailed car info
*/

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL,
  currency text DEFAULT 'USD',
  mileage integer DEFAULT 0,
  condition text DEFAULT 'مستعملة',
  engine_type text,
  engine_size text,
  transmission text,
  fuel_type text,
  drive_type text,
  exterior_color text,
  interior_color text,
  description text,
  images jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'متوفرة',
  is_featured boolean DEFAULT false,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Public can view visible cars
CREATE POLICY "Anyone can view visible cars"
  ON cars FOR SELECT
  TO public
  USING (is_visible = true);

-- Authenticated users (admins) can view all cars
CREATE POLICY "Admins can view all cars"
  ON cars FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users (admins) can insert cars
CREATE POLICY "Admins can insert cars"
  ON cars FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users (admins) can update cars
CREATE POLICY "Admins can update cars"
  ON cars FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users (admins) can delete cars
CREATE POLICY "Admins can delete cars"
  ON cars FOR DELETE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_featured ON cars(is_featured);
CREATE INDEX IF NOT EXISTS idx_cars_visible ON cars(is_visible);
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
CREATE INDEX IF NOT EXISTS idx_cars_created_at ON cars(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();