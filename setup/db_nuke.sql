/* 
during the db creation, postgres likes to create names with all lower case
*/
DROP USER filamentmanageruser;
\c postgres;
DROP DATABASE filamentmanagerdb WITH (FORCE);