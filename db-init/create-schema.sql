-- Connect to the trackride database and create schema
\c trackride;
CREATE SCHEMA IF NOT EXISTS trackride;
-- Set the search path to include the trackride schema
ALTER DATABASE trackride SET search_path TO trackride, public;
