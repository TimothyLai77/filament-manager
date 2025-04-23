/**
Running: `psql postgres -f db_nuke.sql`
*/

-- Killing all connections to the database
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'filamentmanagerdb'
  AND pid <> pg_backend_pid();

-- Dropping database
DROP DATABASE IF EXISTS "filamentmanagerdb";

-- Dropping role
DROP ROLE IF EXISTS "filamentmanageruser";