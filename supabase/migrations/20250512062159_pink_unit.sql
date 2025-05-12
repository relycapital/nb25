/*
  # Billing and Usage Schema

  1. New Tables
    - billing_usage
      - Track storage and bandwidth usage
    - usage_history
      - Historical usage data
    - payouts
      - Videographer payment tracking

  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Billing Usage table
CREATE TABLE IF NOT EXISTS billing_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  month date NOT NULL,
  storage_used_gb numeric DEFAULT 0 NOT NULL,
  transfer_used_gb numeric DEFAULT 0 NOT NULL,
  storage_cost_usd numeric DEFAULT 0 NOT NULL,
  transfer_cost_usd numeric DEFAULT 0 NOT NULL,
  UNIQUE(user_id, month)
);

ALTER TABLE billing_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own billing usage"
  ON billing_usage
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Usage History table
CREATE TABLE IF NOT EXISTS usage_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  storage_used_gb numeric NOT NULL,
  bandwidth_used_gb numeric NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE usage_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own usage history"
  ON usage_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Payouts table
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

CREATE POLICY "Admins can manage payouts"
  ON payouts
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

CREATE POLICY "Videographers can read own payouts"
  ON payouts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = videographer_id);