-- PostgreSQL create Tables
-- Drop table

-- DROP TABLE public.setor_usuario;

CREATE TABLE public.setor_usuario (
	user_id int4 NOT NULL,
	setor_id int4 NOT NULL,
	grant_access bool NOT NULL,
	CONSTRAINT setor_usuario_pkey PRIMARY KEY (user_id, setor_id),
	CONSTRAINT account_role_role_id_fkey FOREIGN KEY (setor_id) REFERENCES setores(id),
	CONSTRAINT account_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES usuario(id)
);

-- Drop table

-- DROP TABLE public.setores;

CREATE TABLE public.setores (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT setores_name_key UNIQUE (name),
	CONSTRAINT setores_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.usuario;

CREATE TABLE public.usuario (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT usuario_name_key UNIQUE (name),
	CONSTRAINT usuario_pkey PRIMARY KEY (id)
);


INSERT INTO public.setores ("name") VALUES 
('Setor 1')
,('Setor 2')
,('Setor 3')
;