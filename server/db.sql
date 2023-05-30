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

INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (94, 11, NULL);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (95, 11, true);


--
-- Data for Name: group_post; Type: TABLE DATA; Schema: public; Owner: panpan
--

INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (237, 'https://media2.giphy.com/media/gw3IWyGkC0rsazTi/200.gif?cid=d168aec0bliprrgsvk9hqegvjxelltm5ez9ok25oi68818q5&ep=v1_gifs_search&rid=200.gif&ct=g', 'Test', 11, 93);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (238, 'https://media4.giphy.com/media/3ohc0ZRliclUMt98Va/200.gif?cid=d168aec0pxza7fgpd7hpcv5dka08gu94qsq3hu22b5okc0e0&ep=v1_gifs_search&rid=200.gif&ct=g', 'Test', 11, 94);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (239, 'https://media4.giphy.com/media/hVTouq08miyVo1a21m/200.gif?cid=d168aec0uuwbn0gtahoubih6k27ldj3kd13e97m9cmovrdk6&ep=v1_gifs_search&rid=200.gif&ct=g', 'Test', 11, 94);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (240, 'https://media0.giphy.com/media/l3fzM2wgd6TygHbYA/200.gif?cid=d168aec0bliprrgsvk9hqegvjxelltm5ez9ok25oi68818q5&ep=v1_gifs_search&rid=200.gif&ct=g', 'Test', 11, 94);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (241, NULL, 'Test', 11, 94);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (242, 'https://media2.giphy.com/media/l3V0H7bYv5Ml5TOfu/200.gif?cid=d168aec0bliprrgsvk9hqegvjxelltm5ez9ok25oi68818q5&ep=v1_gifs_search&rid=200.gif&ct=g', 'TEd', 11, 94);


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

INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (53, 'p', 'p', 'p', NULL, 'https://s.gravatar.com/avatar/5e586d3f8030175f5524a308356917cf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+signuptest@gmail.com', 'p', 'auth0|646a7d5192e83c2d192f4312');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (11, 'Pandora', 'Pandora', 'They/Them', '2023-05-05 00:00:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZnsb9WJSRlXfRpnJ26aRDMxw8S0F1BPFM1i-kn14uA&s', 'pan2dora.brown@gmail.com', NULL, 'google-oauth2|110151895661426733698');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (51, NULL, 'Sandy', 'she/her', '2023-05-26 00:00:00', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2015%2F07%2Fhello-kitty.jpg&q=60', 'pan2dora.brown+test20@gmail.com', NULL, 'auth0|646a7a1529c87bf8f14fb4cd');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (50, NULL, 'John Doe', 'he/him', '1990-01-01 00:00:00', 'https://example.com/profile.jpg', 'pan2dora.brown+test9@gmail.com', NULL, 'auth0|646a79a9d70fc3a64b092810');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (54, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/ec1e7cc6f35206231770f980cf34b8b0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+anothertest@gmail.com', NULL, 'auth0|646b7702d70fc3a64b094a0f');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (55, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/bbe4af030600d5ccacb081d60a32f395?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+test202@gmail.com', NULL, 'auth0|646ba630d2af3a84da91dc6f');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (56, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/e1bc32da6e7044205251778a53019634?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+rubytest@gmail.com', NULL, 'auth0|646bb032d2af3a84da91de84');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (57, NULL, 'test', 'test', '2023-05-27 00:00:00', 'test', 'testing@gmail.com', NULL, 'auth0|646bb14bc5e194bb12b1d253');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (58, NULL, 'vixenxloki', 'they/them', '2023-05-30 00:00:00', 'test', 'test@test.com', NULL, 'auth0|646be05e2b851c3fe65fa3a0');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (59, NULL, 'vixenxloki', 'they/them', '2023-05-16 00:00:00', 'test', 'pan2dora.brown+test100@gmail.com', NULL, 'auth0|646f57584143421ed3474065');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (60, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/76386fa0a93962366aed304da1494c8e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+test900@gmail.com', NULL, 'auth0|646fad1a2da97822aabcde85');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (10, 'John', NULL, NULL, NULL, 'https://example.com/profile.jpg', 'test1@example.com', NULL, '10');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (9, 'John', NULL, NULL, NULL, 'https://example.com/profile.jpg', 'test@example.com', NULL, '9');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (8, 'Pandora', 'panda_panda', 'they/them', '1993-08-23 00:00:00', 'image will go here', 'blah@example.com', NULL, '8');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (7, 'Yoshi', 'spotted_egg', 'they/them', '1990-10-14 00:00:00', 'image will go here', 'yoshi@example.com', NULL, '7');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (6, 'Toad', 'todally_toad', 'they/them', '1985-09-13 00:00:00', 'image will go here', 'toad@example.com', NULL, '6');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (5, 'Donkey', 'DK81', 'he/him', '1981-07-09 00:00:00', 'image will go here', 'donkeykong@example.com', NULL, '5');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (4, 'Bowser', 'koopa-king', 'he/him', '1985-09-13 00:00:00', 'image will go here', 'bowser@example.com', NULL, '4');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (3, 'Luigi', 'luigixbrave', 'he/they', '1964-11-11 00:00:00', 'image will go here', 'luigi@example.com', NULL, '3');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (2, 'Peach', 'peaches_peaches', 'she/her', '1965-08-01 00:00:00', 'image will go here', 'princesspeach@example.com', NULL, '2');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (1, 'Mario', 'peach_lover', 'he/him', '1964-11-11 00:00:00', 'image will go here', 'mario@example.com', NULL, '1');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (52, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/a7fff5fffac30c429f5f768716e7a18e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+test21@gmail.com', NULL, 'auth0|646a7bcfc3f3a8e08ad02b5c');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (28, NULL, NULL, NULL, NULL, NULL, 'pan2dora.brown+test6@gmail.com', NULL, 'auth0|646a2edf29c87bf8f14faa09');


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

