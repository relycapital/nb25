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