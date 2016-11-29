--
-- add_question_and_choice_table
--

BEGIN;

CREATE SCHEMA question;

CREATE TABLE question.question (
  {{col.__deleted}},
  {{col.timestamps}},
  {{col.id}},
  prompt text NOT NULL,
  choices text[]
);

CREATE TABLE question.vote (
  {{col.__deleted}},
  {{col.timestamps}},
  question_id bigint,
  choice_index int,

  FOREIGN KEY (question_id) REFERENCES question.question (id)
);

END;
