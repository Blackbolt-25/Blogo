# **Blogo**

## Setup:-

For cloning :-

    git clone git@github.com:Blackbolt-25/Blogo.git

For installing node packages:-

    npm i

For setting up a local server:-

    nodemon index.js 


For Setting up postgreSQL16:-

1.)Create two tables (posts and users).

2.)For creating users table use:-

    CREATE TABLE users(username VARCHAR(45) PRIMARY KEY,password VARCHAR(45));

3.)Similary for posts table use:-

    CREATE TABLE posts(username VARCHAR(45), header VARCHAR(30), blog TEXT, FOREIGN KEY(username) references users(username));

4.)The above tasks can be done using pgAdmin 4.

For more Information on PostgreSQL. Here is a Quickstart [link](https://www.postgresql.org/docs/current/tutorial-start.html) to get you started.
    


