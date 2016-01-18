-- Table: public.adherence_log

-- DROP TABLE public.adherence_log;

CREATE TABLE public.adherence_log
(
  medication character varying(32),
  logged timestamp with time zone
)
WITH (
  OIDS=TRUE
);
ALTER TABLE public.adherence_log
  OWNER TO adherence_log;
