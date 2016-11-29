--
-- add_token_columns_to_vote_and_question
--

BEGIN;

ALTER TABLE question.question ADD COLUMN council_token TEXT;
ALTER TABLE question.vote ADD COLUMN council_token TEXT;

END;
