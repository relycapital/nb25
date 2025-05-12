/*
  # Usage History Table Creation

  1. New Tables
    - `usage_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `storage_used_gb` (numeric)
      - `bandwidth_used_gb` (numeric)
      - `recorded_at` (timestamptz)

  2. Security
    - Enable RLS on `usage_history` table
    - Add policy for users to read their own usage history

  3. Sample Data
    - Insert sample usage data for existing users
    - Generate data for past 6 months
*/

-- Create usage history table if it doesn't exist
CREATE TABLE IF NOT EXISTS usage_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  storage_used_gb numeric NOT NULL,
  bandwidth_used_gb numeric NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE usage_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can read own usage history" ON usage_history;

-- Create policy
CREATE POLICY "Users can read own usage history"
  ON usage_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample data
WITH RECURSIVE months AS (
  SELECT date_trunc('month', now()) - (interval '5 month') as month
  UNION ALL
  SELECT month + interval '1 month'
  FROM months
  WHERE month < date_trunc('month', now())
),
users_with_projects AS (
  SELECT DISTINCT u.id
  FROM users u
  INNER JOIN projects p ON p.user_id = u.id
)
INSERT INTO usage_history (user_id, storage_used_gb, bandwidth_used_gb, recorded_at)
SELECT 
  u.id,
  100 + random() * 200 as storage_used_gb,
  400 + random() * 800 as bandwidth_used_gb,
  m.month as recorded_at
FROM users_with_projects u
CROSS JOIN months m;