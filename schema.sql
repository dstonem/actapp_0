create table users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) UNIQUE not null,
    password VARCHAR(100) not null,
    firstName text not null,
    lastName text not null,
    email VARCHAR UNIQUE not null,
    streetaddress VARCHAR not null,
    city VARCHAR not null,
    state VARCHAR not null,
    zipcode VARCHAR not null,
    profilePic VARCHAR UNIQUE,
    cause_one TEXT,
    cause_two TEXT,
    cause_three TEXT
);

create table posts (
    id SERIAL PRIMARY KEY,
    picurl text not null,
    body VARCHAR not null,
    causes VARCHAR,
    post_url VARCHAR,
    user_id integer references users (id),
    username VARCHAR references users (username)
);

create table likes (
    user_id integer references users (id),
    post_id integer references posts (id)
);

create table comments (
    id serial primary key,
    comment text not null,
    created_at timestamp default now(),
    post_id integer references posts (id),
    user_id integer references users (id),
    username text REFERENCES users (username)
);

create table tags (
    id SERIAL PRIMARY KEY,
    tag VARCHAR
);

create table tags_posts (
    tag_id VARCHAR,
    post_id VARCHAR
);


insert into users (username,password,firstName,lastName,email,streetaddress,city,state,zipcode,cause_one,cause_two,cause_three)

values 
    ('dstonem','123456','dylan','stone-miller','dstonemiller@gmail.com', '1234 Marsh Trail Circle', 'Sandy Springs', 'Georgia', '29307','blm','election','climate'),
    ('npatton','123456','nathan','patton','npatton@gmail.com', '1234 Ashford Road', 'Atlanta', 'Georgia', '22236','blm','election','climate')
;

insert into posts (picurl,body,causes,post_url,user_id,username) 
values
    ('/images/1596310291366john-mark-smith-IS7WfX_f_ug-unsplash.jpg','body','blm','post1',1,'dstonem'),
    ('/images/1596310291366john-mark-smith-IS7WfX_f_ug-unsplash.jpg','body','climate','post2',1,'dstonem'),
    ('/images/1596310291366john-mark-smith-IS7WfX_f_ug-unsplash.jpg','body','election','post3',1,'dstonem'),
    ('/images/1596316748869k-mitch-hodge-LBFZfZp7sq4-unsplash.jpg','body','blm','post4',2,'npatton'),
    ('/images/1596316748869k-mitch-hodge-LBFZfZp7sq4-unsplash.jpg','body','climate','post5',2,'npatton'),
    ('/images/1596316748869k-mitch-hodge-LBFZfZp7sq4-unsplash.jpg','body','election','post6',2,'npatton')
;

insert into likes (user_id, post_id)
values
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 4),
    (2, 5),
    (2, 6);

insert into comments (comment,post_id,user_id,username)
VALUES
    ('Nice job!',1,2,'npatton'),
    ('Nice one!',4,1,'dstonem');

-- start with the ONE and end with the MANY

select users.id as uid, users.username, users.firstName, posts.id as pid, posts.picurl
    from users join posts
    on posts.user_id = users.id
    
    -- keep all the queries on the backend so they're right next to the database (faster)