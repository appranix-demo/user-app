CREATE TABLE "user"
(
  id bigint NOT NULL,
  created_date_time datetime,
  email_id character varying(255),
  first_name character varying(255),
  last_name character varying(255),
  address character varying(255),
  PRIMARY KEY (id)
);
