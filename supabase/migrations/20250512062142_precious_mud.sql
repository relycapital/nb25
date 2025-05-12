/*
  # Authentication and User Management Schema

  1. New Tables
    - users
      - Core user information and profile data
    - admins
      - Admin user management
    - videographers
      - Videographer profiles and details

  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all admin profiles"
  ON admins
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins a WHERE a.id = auth.uid()));

-- Videographers table
CREATE TABLE IF NOT EXISTS videographers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  location text,
  portfolio_url text,
  certifications text,
  gear_list text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videographers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videographers can read own profile"
  ON videographers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Videographers can update own profile"
  ON videographers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);