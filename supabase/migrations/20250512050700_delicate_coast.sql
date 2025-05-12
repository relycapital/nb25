/*
  # Create Videographer Tables

  1. New Tables
    - videographers: Store videographer profiles
    - project_assignments: Track project assignments
    - deliverables: Store project deliverables
    - payouts: Track videographer payments

  2. Security
    - Enable RLS on all tables
    - Add policies for videographers to access their own data
*/

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

-- Project assignments table
CREATE TABLE IF NOT EXISTS project_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id),
  videographer_id uuid REFERENCES videographers(id),
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

CREATE POLICY "Videographers can update own assignments"
  ON project_assignments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = videographer_id);

-- Deliverables table
CREATE TABLE IF NOT EXISTS deliverables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES project_assignments(id),
  file_url text NOT NULL,
  notes text,
  is_final boolean DEFAULT false,
  submitted_at timestamptz DEFAULT now(),
  approved_by_admin_id uuid REFERENCES admins(id),
  approved_at timestamptz
);

ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videographers can read own deliverables"
  ON deliverables
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM project_assignments
    WHERE project_assignments.id = deliverables.assignment_id
    AND project_assignments.videographer_id = auth.uid()
  ));

CREATE POLICY "Videographers can create deliverables"
  ON deliverables
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM project_assignments
    WHERE project_assignments.id = deliverables.assignment_id
    AND project_assignments.videographer_id = auth.uid()
  ));

-- Payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  videographer_id uuid REFERENCES videographers(id),
  project_id uuid REFERENCES projects(id),
  assignment_id uuid REFERENCES project_assignments(id),
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