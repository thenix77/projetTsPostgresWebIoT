-- Creacion de labase de datos dbsensor

create table tiposhields
(
    id              serial,
    nombre          varchar(100)    not null,
    created         DATE        default now(),
    updated         timestamp        ,
    CONSTRAINT pk_tiposhield PRIMARY key  (id) 
);

create table shields
(
    id              serial,
    nombre          varchar(100)    not null,
    descripcion     text            ,
    tiposhieldId    int             not null,
    imagen          varchar(100)    default 'noimage.jpg',
    pines           varchar(100)    default 'noimage.jpg',
    active          boolean         default true,
    CONSTRAINT pk_shield PRIMARY key(id), 
    CONSTRAINT fk_shield_tiposhield FOREIGN key(tiposhieldId)
            REFERENCES tiposhields(id)
);


create table sensors(
    id              serial,
    nombre          VARCHAR(100)    not null,
    descripcion     text            ,
    active          boolean         default true,
    created         timestamp       default now(),
    updated         timestamp       ,
    CONSTRAINT pk_sensor PRIMARY key (id)
);

create table rols(
    id              serial,
    nombre          varchar(100)    not null,
    craated         timestamp      	default now(),
    updated         timestamp      	,
    constraint pk_roles PRIMARY key(id)  
);

create table users(
    id              serial,
    nombre          varchar(100)        not null,
    apellidop       varchar(100)        not null,
    apellidom       varchar(100)        not null,
    dni             char(8)             not null    unique,
    email           varchar(100)        not null,
    password        varchar(255)        not null,
    rolid           int                 not null,
    active          boolean             default true,
    login           boolean             default false,
    logindate       timestamp           ,
    photo           varchar(100)        default 'nophoto.png',
    created         timestamp           default now(),
    updated         timestamp           ,
    CONSTRAINT pk_usuarios PRIMARY key(id),
    constraint fk_usuarios_roles FOREIGN key (rolid) 
                REFERENCES rols(id),
    constraint uq_email unique (email)
);

create table projects
(
    id              serial,
    nombre          varchar(100)        not null,
    descripcion     text                ,
    userid          int                 ,
    active          boolean             DEFAULT true,
    created         timestamp           DEFAULT now(),
    updated         timestamp 	        ,
    constraint pk_proyecto primary key(id),
    CONSTRAINT uq_proyecto unique (nombre),
    constraint fk_proyecto_users foreign key (userid) references users(id)
);

create table projectshield(
    id              serial,
    projectid       int                 ,
    shieldid        int                 ,
    created         timestamp           DEFAULT now(),
    constraint pk_projectshield  primary key (id),
    constraint fk_project_project foreign key (projectid) references projects(id),
    constraint fk_project_shield  foreign key (shieldid) references shields(id) 
);

create table projectsensors(
    id                      serial,
    projectshieldid         int                 not null,
    sensorid                INT                 ,
    descripcion             text                ,
    active                  boolean             default true,
    created                 timestamp    		DEFAULT now(),
    updated                 timestamp           ,
    constraint pk_projectsensor primary key (id),
    constraint fk_proy_shields foreign key (projectshieldid) REFERENCES shields(id),
    constraint fk_proy_sensor foreign key (sensorid) references sensors(id)
); 