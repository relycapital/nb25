/*
  # Create Shared Tables

  1. New Tables
    - support_tickets: Track customer and videographer support requests

  2. Security
    - Enable RLS on all tables
    - Add policies for users, videographers, and admins
*/

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by_user_id uuid REFERENCES users(id),
  submitted_by_videographer_id uuid REFERENCES videographers(id),
  assigned_admin_id uuid REFERENCES admins(id),
  subject text NOT NULL,
  category text NOT NULL,
  priority text NOT NULL,
  description text NOT NULL,
  attachment_url text,
  status text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own tickets
CREATE POLICY "Users can read own tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = submitted_by_user_id OR
    auth.uid() = submitted_by_videographer_id OR
    auth.uid() = assigned_admin_id
  );

-- Policy for users to create tickets
CREATE POLICY "Users can create tickets"
  ON support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = submitted_by_user_id OR
    auth.uid() = submitted_by_videographer_id
  );

-- Policy for users to update their own tickets
CREATE POLICY "Users can update own tickets"
  ON support_tickets
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = submitted_by_user_id OR
    auth.uid() = submitted_by_videographer_id OR
    auth.uid() = assigned_admin_id
  );