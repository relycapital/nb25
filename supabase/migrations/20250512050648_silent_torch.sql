/*
  # Create Customer Tables

  1. New Tables
    - users: Store customer account information
    - projects: Track video production projects
    - assets: Store project-related files and media
    - billing_usage: Track storage and transfer usage

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  company_name text,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  status text NOT NULL,
  deadline timestamptz,
  created_at timestamptz DEFAULT now(),
  assigned_videographer_id uuid REFERENCES videographers(id)
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id),
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
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assets.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can upload assets"
  ON assets
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assets.project_id
    AND projects.user_id = auth.uid()
  ));

-- Billing usage table
CREATE TABLE IF NOT EXISTS billing_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
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