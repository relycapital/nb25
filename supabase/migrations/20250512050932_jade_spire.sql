/*
  # Create Videographer Tables

  1. New Tables
    - `videographers`: Stores videographer profiles
    - `project_assignments`: Tracks project assignments
    - `deliverables`: Stores project deliverables
    - `payouts`: Manages videographer payments

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add foreign key constraints
*/

-- Create videographers table
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

-- Create project_assignments table
CREATE TABLE IF NOT EXISTS project_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  videographer_id uuid REFERENCES videographers(id) ON DELETE CASCADE,
  assigned_by_admin_id uuid REFERENCES admins(id),
  status text NOT NULL,
  assigned_at timestamptz DEFAULT now(),
  submission_deadline timestamptz,
  notes text
);

ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videographers can read own assignments"
  ON project_assignments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = videographer_id);

CREATE POLICY "Admins can manage assignments"
  ON project_assignments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

-- Create deliverables table
CREATE TABLE IF NOT EXISTS deliverables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES project_assignments(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  notes text,
  is_final boolean DEFAULT false,
  submitted_at timestamptz DEFAULT now(),
  approved_by_admin_id uuid REFERENCES admins(id),
  approved_at timestamptz
);

ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videographers can read and create deliverables"
  ON deliverables
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_assignments
      WHERE project_assignments.id = assignment_id
      AND project_assignments.videographer_id = auth.uid()
    )
  );

-- Create payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  videographer_id uuid REFERENCES videographers(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES project_assignments(id) ON DELETE CASCADE,
  status text NOT NULL,
  amount_usd numeric NOT NULL,
  payment_method text NOT NULL,
  admin_approved_by uuid REFERENCES admins(id),
  approved_at timestamptz,
  paid_at timestamptz,
  transaction_id text
);

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videographers can read own payouts"
  ON payouts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = videographer_id);

CREATE POLICY "Admins can manage payouts"
  ON payouts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );