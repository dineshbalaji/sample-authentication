-- TODO:
-- chkpass module to use for passward encrption 
-- https://stackoverflow.com/questions/1200326/what-is-the-datatype-for-a-password-in-postgresql

CREATE TABLE IF NOT EXISTS users (userId SERIAL, username VARCHAR(12),   password VARCHAR(21));

--  Adding default user
DO $$
	BEGIN
		IF (SELECT username FROM  users WHERE username !='admin') THEN
			INSERT INTO users(username, password) VALUES('admin', 'admin'); 
			RAISE NOTICE 'row inserted ';
		ELSE 
			RAISE NOTICE 'row already exists';
		END IF;
END $$;	

-- Weird: postgresSql doesn't support store prodcure hence i wrote store function.
-- https://dzone.com/articles/stored-functions-as-stored-procedures-in-postgresq

DROP FUNCTION IF EXISTS getuser(varchar(12));
CREATE OR REPLACE FUNCTION getuser (in_name VARCHAR(12)) 
 RETURNS TABLE (
	id int,		 
 name VARCHAR(12),
 password VARCHAR(21)
) 
AS $$
BEGIN
 RETURN QUERY SELECT * FROM users as u WHERE username = in_name;
END; $$ 
LANGUAGE 'plpgsql';

--select * from getuser('admin');