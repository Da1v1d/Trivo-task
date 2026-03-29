-- About 100 demo accounts (see INSERT below).
--
-- Do you need to reseed after editing this file?
--   Yes — run `bun run db:seed` again (or `docker compose -f docker-compose.dev.yml exec server bun run db:seed`).
--
-- Remove existing account data before seeding again (avoids duplicate rows; UUIDs are new each insert):
--   docker compose -f docker-compose.dev.yml exec postgres psql -U postgres -d trivo -c "TRUNCATE accounts CASCADE;"
--   (Local psql): psql "$DATABASE_URL" -c "TRUNCATE accounts CASCADE;"
--
-- `TRUNCATE accounts CASCADE` also clears `account_settings` rows that reference accounts.
-- It does not remove `setting_definitions`.

INSERT INTO accounts (name, surname, role)
SELECT
  (
    ARRAY[
      'John', 'Jane', 'Jim', 'Jack', 'Mary', 'Peter', 'Tony', 'Bruce', 'Clark', 'Barry',
      'Wally', 'Arthur', 'Hal', 'Violet', 'Dash', 'Brandon', 'Carmen', 'Walter', 'Jesse',
      'Alex', 'Blake', 'Casey', 'Dana', 'Ellis', 'Finley', 'Gray', 'Harper', 'Ivy', 'Jordan',
      'Kai', 'Logan', 'Morgan', 'Noah', 'Parker', 'Quinn', 'Riley', 'Sage', 'Taylor', 'Uri',
      'Reese'
    ]
  )[((g - 1) % 40) + 1] AS name,
  'User' || g::text AS surname,
  CASE WHEN g % 10 = 0 THEN 'admin' ELSE 'user' END AS role
FROM generate_series(1, 100) AS g;
