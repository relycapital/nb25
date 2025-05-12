/*
  # Support and System Management Schema

  1. New Tables
    - support_tickets
      - Customer support ticket tracking
    - system_logs
      - System-wide activity logging
    - feature_toggles
      - Feature flag management

  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Support Tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  submitted_by_videographer_id uuid REFERENCES videographers(id) ON DELETE SET NULL,
  assigned_admin_id uuid REFERENCES admins(id) ON DELETE SET NULL,
  subject text NOT NULL,
  category ticket_category NOT NULL,
  priority ticket_priority DEFAULT 'normal' NOT NULL,
  description text NOT NULL,
  attachment_url text,
  status ticket_status DEFAULT 'open' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT check_single_submitter CHECK (
    (submitted_by_user_id IS NOT NULL AND submitted_by_videographer_id IS NULL) OR
    (submitted_by_user_id IS NULL AND submitted_by_videographer_id IS NOT NULL)
  )
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create tickets"
  ON support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.uid() = submitted_by_user_id) OR (auth.uid() = submitted_by_videographer_id));

CREATE POLICY "Users can read own tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING ((auth.uid() = submitted_by_user_id) OR (auth.uid() = submitted_by_videographer_id) OR (auth.uid() = assigned_admin_id));

CREATE POLICY "Users can update own tickets"
  ON support_tickets
  FOR UPDATE
  TO authenticated
  USING ((auth.uid() = submitted_by_user_id) OR (auth.uid() = submitted_by_videographer_id) OR (auth.uid() = assigned_admin_id));

-- System Logs table
CREATE TABLE IF NOT EXISTS system_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  details jsonb NOT NULL,
  user_id uuid,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read system logs"
  ON system_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- Feature Toggles table
CREATE TABLE IF NOT EXISTS feature_toggles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_name text UNIQUE NOT NULL,
  enabled boolean DEFAULT false NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE feature_toggles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage feature toggles"
  ON feature_toggles
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));