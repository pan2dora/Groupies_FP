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
    group_name character varying(255)
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

INSERT INTO public.comment (comment_id, comment, comment_user_id, post_id, created_at) VALUES (1, 'Hey Bowser, maybe if you focused more on being a good guy instead of kidnapping people all the time, you wouldn''t have to worry about getting defeated by Mario all the time.', 3, 2, NULL);
INSERT INTO public.comment (comment_id, comment, comment_user_id, post_id, created_at) VALUES (2, 'Sorry Bowser, but I gotta agree with Luigi on this one. You might have some cool gadgets and abilities, but you''ll never be as beloved as Mario.', 6, 2, NULL);
INSERT INTO public.comment (comment_id, comment, comment_user_id, post_id, created_at) VALUES (3, 'Hey Bowser, as a fellow villain-turned-hero, I gotta say it''s never too late to change your ways. You could be crushing barrels instead of kidnapping princesses!', 5, 2, NULL);
INSERT INTO public.comment (comment_id, comment, comment_user_id, post_id, created_at) VALUES (4, 'Ha, nice to see you posting on social media instead of being held captive in my castle! ', 4, 1, NULL);
INSERT INTO public.comment (comment_id, comment, comment_user_id, post_id, created_at) VALUES (6, 'You''re always looking radiant, Peach! I''m so glad I get to save you every time Bowser tries to kidnap you. ', 1, 1, NULL);
INSERT INTO public.comment (comment_id, comment, comment_user_id, post_id, created_at) VALUES (5, 'Yoshi like! Peach post always so pretty and nice! Maybe Yoshi come visit castle and bring some yummy fruit for everyone?', 7, 1, NULL);


--
-- Data for Name: group_membership; Type: TABLE DATA; Schema: public; Owner: panpan
--

INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (1, 1, NULL);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (1, 8, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (3, 8, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (2, 8, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (66, 8, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (67, 8, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (71, 11, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (72, 11, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (73, 11, true);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (58, 11, NULL);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (73, 11, NULL);
INSERT INTO public.group_membership (gtid, uid, is_admin) VALUES (1, 11, NULL);


--
-- Data for Name: group_post; Type: TABLE DATA; Schema: public; Owner: panpan
--

INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (1, 'http://dummyimage.com/190x100.png/cc0000/ffffff', 'Just got rescued by my favorite plumber/bodyguard again! Thanks for always being there, Mario! 🙌🏼👑💕 #SuperMarioBros #SavedAgain #PlumberBodyguard', 2, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (8, 'postman test', 'postman test', NULL, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (9, 'test', 'yadyayayd', 8, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (2, 'http://dummyimage.com/190x100.png/cc0000/ffffff', 'Another day, another thwarted attempt by Mario to defeat me with those silly power-ups. It''s like he doesn''t even know who he''s dealing with! 😂🔥🐢 #Bowser #KingKoopa #Unstoppable"', 4, 2);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (3, 'http://dummyimage.com/190x100.png/cc0000/ffffff', '"Feeling strong 💪🏼 and ready to crush some barrels today! Who else is with me? 🦍🔨 #DonkeyKong #GorillaPower #BarrelSmasher"', 5, 2);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (15, 'This is a post test', 'This is a post test', NULL, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (16, NULL, 'hi', NULL, 2);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (17, NULL, 'This is a test to see if it post to groups', NULL, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (19, NULL, 'Authentication test', NULL, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (20, NULL, 'Test', NULL, 2);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (21, NULL, 'hi', NULL, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (22, NULL, 'hi', NULL, 3);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (23, NULL, 'Test', NULL, 2);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (24, NULL, 'This is a test', NULL, 1);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (25, NULL, 'Test', NULL, 2);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (26, NULL, 'Hello test', NULL, 2);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (27, NULL, 'gf', NULL, 3);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (28, NULL, 'yes', NULL, 58);
INSERT INTO public.group_post (group_post_id, image, content, user_id, group_table_id) VALUES (29, NULL, 'hi', NULL, 2);


--
-- Data for Name: group_table; Type: TABLE DATA; Schema: public; Owner: panpan
--

INSERT INTO public.group_table (group_table_id, group_name) VALUES (1, 'Mushroom Kingdom');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (2, 'Koopaville');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (3, 'Test Group w/ thunderclient');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (30, 'Submission Test 1');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (31, 'Test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (32, 'Testing Authorization');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (46, 'Testing new group');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (47, 'Testing new group');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (48, 'Test test test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (49, 'Testing');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (50, 'Test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (51, 'sub test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (52, 'req test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (53, 'test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (54, 'test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (55, 'Test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (56, 'test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (57, 'sub test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (58, 'test with just user');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (59, 'testy');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (60, 'another');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (61, 'please be the last');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (62, 'tes');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (63, 'yay');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (64, 'Doop');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (65, 'Last test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (66, 'tester');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (67, 'tes');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (68, 'Test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (69, 'Testing again');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (70, 'Test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (71, 'Anotha test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (72, 'Test');
INSERT INTO public.group_table (group_table_id, group_name) VALUES (73, 'Grouptestforadmin');


--
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: panpan
--

INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (53, 'p', 'p', 'p', NULL, 'https://s.gravatar.com/avatar/5e586d3f8030175f5524a308356917cf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+signuptest@gmail.com', 'p', 'auth0|646a7d5192e83c2d192f4312');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (11, 'Pandora', 'John Doe', 'he/him', NULL, 'https://example.com/profile.jpg', 'pan2dora.brown@gmail.com', NULL, 'google-oauth2|110151895661426733698');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (50, NULL, 'John Doe', 'he/him', '1990-01-01 00:00:00', 'https://example.com/profile.jpg', 'pan2dora.brown+test9@gmail.com', NULL, 'auth0|646a79a9d70fc3a64b092810');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (54, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/ec1e7cc6f35206231770f980cf34b8b0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+anothertest@gmail.com', NULL, 'auth0|646b7702d70fc3a64b094a0f');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (55, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/bbe4af030600d5ccacb081d60a32f395?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+test202@gmail.com', NULL, 'auth0|646ba630d2af3a84da91dc6f');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (56, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/e1bc32da6e7044205251778a53019634?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+rubytest@gmail.com', NULL, 'auth0|646bb032d2af3a84da91de84');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (57, NULL, 'test', 'test', '2023-05-27 00:00:00', 'test', 'testing@gmail.com', NULL, 'auth0|646bb14bc5e194bb12b1d253');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (58, NULL, 'vixenxloki', 'they/them', '2023-05-30 00:00:00', 'test', 'test@test.com', NULL, 'auth0|646be05e2b851c3fe65fa3a0');
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
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (51, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/e244f90a783d3a15d406660a1c23c4d2?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+test20@gmail.com', NULL, 'auth0|646a7a1529c87bf8f14fb4cd');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (52, NULL, NULL, NULL, NULL, 'https://s.gravatar.com/avatar/a7fff5fffac30c429f5f768716e7a18e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png', 'pan2dora.brown+test21@gmail.com', NULL, 'auth0|646a7bcfc3f3a8e08ad02b5c');
INSERT INTO public.user_table (user_id, given_name, displayname, pronouns, date_of_birth, picture, email, password, auth0_sub) VALUES (28, NULL, NULL, NULL, NULL, NULL, 'pan2dora.brown+test6@gmail.com', NULL, 'auth0|646a2edf29c87bf8f14faa09');


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 1, true);


--
-- Name: group_table_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.group_table_group_id_seq', 73, true);


--
-- Name: post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.post_post_id_seq', 29, true);


--
-- Name: user_table_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: panpan
--

SELECT pg_catalog.setval('public.user_table_user_id_seq', 58, true);


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

