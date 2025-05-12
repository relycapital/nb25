/*
  # Projects and Assets Schema

  1. New Tables
    - projects
      - Project management and details
    - assets
      - Project assets and files
    - project_assignments
      - Videographer assignments to projects

  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL,
  deadline timestamptz,
  created_at timestamptz DEFAULT now(),
  assigned_videographer_id uuid REFERENCES videographers(id) ON DELETE SET NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING ((auth.uid() = user_id) OR (auth.uid() = assigned_videographer_id));

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING ((auth.uid() = user_id) OR (auth.uid() = assigned_videographer_id));

-- Assets table
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
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assets.project_id
    AND (projects.user_id = auth.uid() OR projects.assigned_videographer_id = auth.uid())
  ));

CREATE POLICY "Users can upload assets"
  ON assets
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = assets.project_id
    AND (projects.user_id = auth.uid() OR projects.assigned_videographer_id = auth.uid())
  ));

-- Project Assignments table
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

CREATE POLICY "Admins can manage assignments"
  ON project_assignments
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

CREATE POLICY "Videographers can read own assignments"
  ON project_assignments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = videographer_id);