--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: panpan
--

CREATE TABLE public.comment (
    comment_id integer NOT NULL,
    comment text,
    comment_user_id integer,
    post_id integer,
    created_at date
);


ALTER TABLE public.comment OWNER TO panpan;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: panpan
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO panpan;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: panpan
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comment.comment_id;


--
-- Name: group_membership; Type: TABLE; Schema: public; Owner: panpan
--

CREATE TABLE public.group_membership (
    gtid integer NOT NULL,
    uid integer NOT NULL,
    is_admin boolean
);


ALTER TABLE public.group_membership OWNER TO panpan;

--
-- Name: group_post; Type: TABLE; Schema: public; Owner: panpan
--

CREATE TABLE public.group_post (
    group_post_id integer NOT NULL,
    image text,
    content text NOT NULL,
    user_id integer,
    group_table_id integer
);


ALTER TABLE public.group_post OWNER TO panpan;

--
-- Name: group_table; Type: TABLE; Schema: public; Owner: panpan
--

CREATE TABLE public.group_table (
    group_table_id integer NOT NULL,
    group_name character varying(255),
    description text
);


ALTER TABLE public.group_table OWNER TO panpan;

--
-- Name: group_table_group_id_seq; Type: SEQUENCE; Schema: public; Owner: panpan
--

CREATE SEQUENCE public.group_table_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_table_group_id_seq OWNER TO panpan;

--
-- Name: group_table_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: panpan
--

ALTER SEQUENCE public.group_table_group_id_seq OWNED BY public.group_table.group_table_id;


--
-- Name: post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: panpan
--

CREATE SEQUENCE public.post_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_post_id_seq OWNER TO panpan;

--
-- Name: post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: panpan
--

ALTER SEQUENCE public.post_post_id_seq OWNED BY public.group_post.group_post_id;


--
-- Name: user_table_user_id_seq; Type: SEQUENCE; Schema: public; Owner: panpan
--

CREATE SEQUENCE public.user_table_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_table_user_id_seq OWNER TO panpan;

--
-- Name: user_table; Type: TABLE; Schema: public; Owner: panpan
--

CREATE TABLE public.user_table (
    user_id integer DEFAULT nextval('public.user_table_user_id_seq'::regclass) NOT NULL,
    given_name character varying(50),
    displayname character varying(50),
    pronouns character varying(50),
    date_of_birth timestamp without time zone,
    picture character varying(1500),
    email character varying(50),
    password text,
    auth0_sub character varying(100) NOT NULL
);


ALTER TABLE public.user_table OWNER TO panpan;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: panpan
--

CREATE SEQUENCE public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO panpan;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: panpan
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO panpan;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: panpan
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.user_table.user_id;


--
-- Name: comment comment_id; Type: DEFAULT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.comment ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: group_post group_post_id; Type: DEFAULT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_post ALTER COLUMN group_post_id SET DEFAULT nextval('public.post_post_id_seq'::regclass);


--
-- Name: group_table group_table_id; Type: DEFAULT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_table ALTER COLUMN group_table_id SET DEFAULT nextval('public.group_table_group_id_seq'::regclass);


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: panpan
--



--
-- Data for Name: group_membership; Type: TABLE DATA; Schema: public; Owner: panpan
--



--
-- Data for Name: group_post; Type: TABLE DATA; Schema: public; Owner: panpan
--



--
-- Data for Name: group_table; Type: TABLE DATA; Schema: public; Owner: panpan
--

INSERT INTO public.group_table (group_table_id, group_name, description) VALUES (1, 'Koopaville', '
Welcome to Koopa Ville, the ultimate gathering place for all things fun and adventurous! Get ready to embark on a wild journey through a whimsical world filled with mischievous Koopas, exciting challenges, and unforgettable friendships.

In Koopa Ville, every day is an adventure waiting to happen. Whether you''re soaring through the skies on flying Koopa shells, racing against your friends in thrilling Go-Kart competitions, or outsmarting Mario and his crew, there''s never a dull moment in our vibrant community.

Join us as we explore mysterious castles, uncover hidden treasures, and conquer towering obstacles together. With our lively group of Koopas by your side, you''ll experience the thrill of daring escapades, epic quests, and plenty of laughs along the way.');
INSERT INTO public.group_table (group_table_id, group_name, description) VALUES (2, 'Mushroom Kingdom', 'In Mushroom Kingdom, every day is a celebration of joy, friendship, and extraordinary quests. Join forces with the courageous Mario and his loyal companions as they venture through lush green landscapes, navigate treacherous obstacles, and confront dastardly villains.

Embark on thrilling escapades that will take you deep into mystical forests, soaring over mushroom-capped hills, and diving into sparkling underwater worlds. Along the way, you''ll encounter lively characters like cheerful Toads, mischievous Yoshis, and even the mischievous but lovable Luigi.

');
INSERT INTO public.group_table (group_table_id, group_name, description) VALUES (93, 'test', 'test');
INSERT INTO public.group_table (group_table_id, group_name, description) VALUES (94, 'Test', 'Test');
INSERT INTO public.group_table (group_table_id, group_name, description) VALUES (95, 'Test', 'Test');


--
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: panpan
--



--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 1, true);


--
-- Name: group_table_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.group_table_group_id_seq', 95, true);


--
-- Name: post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.post_post_id_seq', 242, true);


--
-- Name: user_table_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.user_table_user_id_seq', 60, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);


--
-- Name: comment comments_pkey; Type: CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: group_table group_table_pkey; Type: CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_table
    ADD CONSTRAINT group_table_pkey PRIMARY KEY (group_table_id);


--
-- Name: group_post post_pkey; Type: CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_post
    ADD CONSTRAINT post_pkey PRIMARY KEY (group_post_id);


--
-- Name: user_table user_table_auth0_sub_key; Type: CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_auth0_sub_key UNIQUE (auth0_sub);


--
-- Name: user_table users_email_key; Type: CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: user_table users_pkey; Type: CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: comment comments_comment_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comments_comment_by_fkey FOREIGN KEY (comment_user_id) REFERENCES public.user_table(user_id);


--
-- Name: comment comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.group_post(group_post_id);


--
-- Name: group_membership group_membership_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_membership
    ADD CONSTRAINT group_membership_group_id_fkey FOREIGN KEY (gtid) REFERENCES public.group_table(group_table_id);


--
-- Name: group_membership group_membership_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_membership
    ADD CONSTRAINT group_membership_user_id_fkey FOREIGN KEY (uid) REFERENCES public.user_table(user_id);


--
-- Name: group_post group_post_group_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_post
    ADD CONSTRAINT group_post_group_table_id_fkey FOREIGN KEY (group_table_id) REFERENCES public.group_table(group_table_id);


--
-- Name: group_post post_posted_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: panpan
--

ALTER TABLE ONLY public.group_post
    ADD CONSTRAINT post_posted_by_fkey FOREIGN KEY (user_id) REFERENCES public.user_table(user_id);


--
-- PostgreSQL database dump complete
--

