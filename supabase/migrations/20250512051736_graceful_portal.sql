/*
  # Add usage history tracking

  1. New Tables
    - `usage_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `storage_used_gb` (numeric)
      - `bandwidth_used_gb` (numeric)
      - `recorded_at` (timestamptz)

  2. Security
    - Enable RLS on `usage_history` table
    - Add policy for users to read their own usage data
*/

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

-- Insert sample data
INSERT INTO usage_history (user_id, storage_used_gb, bandwidth_used_gb, recorded_at)
SELECT 
  u.id,
  -- Random storage between 100-300 GB
  100 + random() * 200,
  -- Random bandwidth between 400-1200 GB
  400 + random() * 800,
  -- Date for each month in the last 6 months
  date_trunc('month', now()) - (interval '1 month' * generate_series(5, 0))
FROM users u
WHERE EXISTS (
  SELECT 1 FROM projects WHERE projects.user_id = u.id
)
ORDER BY recorded_at;