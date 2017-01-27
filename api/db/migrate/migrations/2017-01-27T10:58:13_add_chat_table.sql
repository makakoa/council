--
-- add_chat_table
--

BEGIN;

CREATE SCHEMA chat;

CREATE TABLE chat.message (
  {{col.__deleted}},
  {{col.timestamps}},
  {{col.id}},
  body text NOT NULL,
  council_token TEXT

);


END;