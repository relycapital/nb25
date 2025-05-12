/*
  # Create support tickets table and policies

  1. New Tables
    - `support_tickets` table for tracking customer and videographer support requests
      - `id` (uuid, primary key)
      - `submitted_by_user_id` (uuid, nullable)
      - `submitted_by_videographer_id` (uuid, nullable)
      - `assigned_admin_id` (uuid, nullable)
      - `subject` (text)
      - `category` (text)
      - `priority` (text)
      - `description` (text)
      - `attachment_url` (text, nullable)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on support_tickets table
    - Add policies for:
      - Reading own tickets
      - Creating tickets
      - Updating own tickets
*/

-- Create enum types for ticket fields
CREATE TYPE ticket_category AS ENUM ('project', 'billing', 'account', 'technical', 'other');
CREATE TYPE ticket_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by_user_id uuid,
  submitted_by_videographer_id uuid,
  assigned_admin_id uuid,
  subject text NOT NULL,
  category ticket_category NOT NULL,
  priority ticket_priority NOT NULL DEFAULT 'normal',
  description text NOT NULL,
  attachment_url text,
  status ticket_status NOT NULL DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key constraints with deferred checks
ALTER TABLE support_tickets
  ADD CONSTRAINT fk_submitted_by_user
  FOREIGN KEY (submitted_by_user_id) 
  REFERENCES auth.users(id)
  ON DELETE SET NULL
  DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE support_tickets
  ADD CONSTRAINT fk_submitted_by_videographer
  FOREIGN KEY (submitted_by_videographer_id) 
  REFERENCES auth.users(id)
  ON DELETE SET NULL
  DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE support_tickets
  ADD CONSTRAINT fk_assigned_admin
  FOREIGN KEY (assigned_admin_id) 
  REFERENCES auth.users(id)
  ON DELETE SET NULL
  DEFERRABLE INITIALLY DEFERRED;

-- Add check constraint to ensure only one submitter type
ALTER TABLE support_tickets
  ADD CONSTRAINT check_single_submitter
  CHECK (
    (submitted_by_user_id IS NOT NULL AND submitted_by_videographer_id IS NULL) OR
    (submitted_by_user_id IS NULL AND submitted_by_videographer_id IS NOT NULL)
  );

-- Enable RLS
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

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE
  ON support_tickets
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();