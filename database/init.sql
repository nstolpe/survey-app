CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS foods (
  id uuid DEFAULT uuid_generate_v4(),
  name varchar(50) NOT NULL UNIQUE,
  votes int DEFAULT 0,
  is_default boolean DEFAULT false,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS colors (
  id uuid DEFAULT uuid_generate_v4(),
  name varchar(50) NOT NULL UNIQUE,
  votes int DEFAULT 0,
  is_default boolean DEFAULT false,
  PRIMARY KEY (id)
);

INSERT INTO foods (name, is_default)
  VALUES ('soup', true), ('sandwich', true), ('salad', true);
INSERT INTO colors (name, is_default)
  VALUES ('red', true), ('green', true), ('blue', true);
