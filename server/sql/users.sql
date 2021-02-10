 DROP TABLE IF EXISTS users;

 CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profile_pic_url VARCHAR DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );