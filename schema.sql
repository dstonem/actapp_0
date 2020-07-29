create table users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) UNIQUE not null,
    password VARCHAR(100) not null,
    firstName text not null,
    lastName text not null,
    email VARCHAR not null,
    address VARCHAR not null,
    city VARCHAR not null,
    state VARCHAR not null
);

create table posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) not null,
    body VARCHAR not null,
    picture IMAGE,
    url text not null,
    user_id integer references users (id)
);

create table likes (
    user_id VARCHAR,
    post_id VARCHAR
);

create table comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR,
    created_at TIMESTAMP,
    user_id VARCHAR,
    post_id VARCHAR
);

create table tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR
);

create table tags_posts (
    tag_id VARCHAR,
    post_id VARCHAR
);

insert into users (username,password,firstName,lastName,email)
values 
    ('dstonem','123456','dylan','stone-miller','dstonemiller@gmail.com', '1234 Marsh Trail Circle', 'Sandy Springs', 'Georgia'),
    ('npatton','123456','nathan','patton','npatton@gmail.com', '1234 Ashford Road', 'Atlanta', 'Georgia')
;

insert into posts (url,user_id) 
values
    ('dylan_photo_1',1),
    ('dylan_photo_2',1),
    ('dylan_photo_3',1),
    ('nathan_photo_1',2),
    ('nathan_photo_2',2),
    ('nathan_photo_3',2)
;

-- start with the ONE and end with the MANY
select users.id as uid, users.username, users.firstName, posts.id as pid, posts.url
    from users join posts
    on posts.user_id = users.id

-- keep all the queries on the backend so they're right next to the database (faster)