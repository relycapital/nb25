/*
  # Create Customer Tables

  1. New Tables
    - `users`: Stores customer information
    - `projects`: Stores project details
    - `assets`: Stores project assets
    - `billing_usage`: Tracks storage and transfer usage

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add foreign key constraints
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  company_name text,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
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

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL,
  deadline timestamptz,
  created_at timestamptz DEFAULT now(),
  assigned_videographer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = assigned_videographer_id);

CREATE POLICY "Users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = assigned_videographer_id);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by_user boolean NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  file_url text NOT NULL,
  size_gb numeric NOT NULL,
  upload_date timestamptz DEFAULT now(),
  source text NOT NULL
);

ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read project assets"
  ON assets
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = assets.project_id
      AND (projects.user_id = auth.uid() OR projects.assigned_videographer_id = auth.uid())
    )
  );

CREATE POLICY "Users can upload assets"
  ON assets
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_id
      AND (projects.user_id = auth.uid() OR projects.assigned_videographer_id = auth.uid())
    )
  );

-- Create billing_usage table
CREATE TABLE IF NOT EXISTS billing_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  month date NOT NULL,
  storage_used_gb numeric NOT NULL DEFAULT 0,
  transfer_used_gb numeric NOT NULL DEFAULT 0,
  storage_cost_usd numeric NOT NULL DEFAULT 0,
  transfer_cost_usd numeric NOT NULL DEFAULT 0
);

ALTER TABLE billing_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own billing usage"
  ON billing_usage
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add unique constraint for user_id and month
ALTER TABLE billing_usage
  ADD CONSTRAINT billing_usage_user_month_unique
  UNIQUE (user_id, month);