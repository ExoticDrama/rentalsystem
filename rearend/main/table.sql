drop database if exists db;
create database db;
use db;
create table db.user
(
    id      int auto_increment
        primary key,
    username    varchar(255)  not null unique ,
    password    varchar(255) not null
)
    collate = utf8mb4_bin;
create table db.stock
(
    id      int auto_increment
        primary key,
    name    varchar(255)  not null unique ,
    information    varchar(255) not null,
    number bigint not null,
    lend_number bigint default 0
)
    collate = utf8mb4_bin;
create table db.lend
(
    id      int auto_increment
        primary key,
    user_id    varchar(255)  not null  ,
    stock_id varchar(255) not null
)
    collate = utf8mb4_bin;


