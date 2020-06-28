insert into sensors
    (nombre)
values
    ('temperatura');
insert into sensors
    (nombre)
values
    ('movimiento');
insert into sensors
    (nombre)
values
    ('brujula');
insert into sensors
    (nombre)
values
    ('acelorometro');
insert into sensors
    (nombre)
values
    ('gas');
insert into sensors
    (nombre)
values
    ('tiempo');
insert into sensors
    (nombre)
values
    ('pantalla');
insert into sensors
    (nombre)
values
    ('convertidor');
insert into sensors
    (nombre)
values
    ('ultrasonico');
insert into sensors
    (nombre)
values
    ('colores');
insert into sensors
    (nombre)
values
    ('motor DC');
insert into sensors
    (nombre)
values
    ('motor DA');
insert into sensors
    (nombre)
values
    ('motor PaP');
insert into sensors
    (nombre)
values
    ('motor Servo');
insert into sensors
    (nombre)
values
    ('humedad');
insert into sensors
    (nombre)
values
    ('vibracion');
insert into sensors
    (nombre)
values
    ('medicion');
insert into sensors
    (nombre)
values
    ('memoria');
insert into sensors
    (nombre)
values
    ('cardio');
insert into sensors
    (nombre)
values
    ('radio frecuencia');
insert into sensors
    (nombre)
values
    ('bluetooth');
insert into sensors
    (nombre)
values
    ('gps');
insert into sensors
    (nombre)
values
    ('shield');
insert into sensors
    (nombre)
values
    ('wireless');
insert into sensors
    (nombre)
values
    ('ethernet');


insert into tiposhields
    (nombre)
values
    ('arduino');
insert into tiposhields
    (nombre)
values
    ('node MCU');
insert into tiposhields
    (nombre)
values
    ('esp8266');
insert into tiposhields
    (nombre)
values
    ('raspberry');

insert into shields
    (nombre,tiposhieldId,imagen,pines)
values
    ('minipro', 1, 'minipro.jpg', 'minipro.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    ('nano', 1, 'nano.jpg', 'nano.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    ('uno', 1, 'uno.jpg', 'uno.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    ('leonardo', 1, 'leonardo.jpg', 'leonardo.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    ('mega', 1, 'leonardo.jpg', 'leonardo.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    ('esp32', 2, 'esp32.jpg', 'esp32.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    ('esp8266', 2 , 'esp8266.jpg', 'esp8266.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    (' zero', 4 , 'zero.jpg', 'zero.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    (' I', 4 , 'i.jpg', 'i.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    (' II', 4, 'ii.jpg', 'ii.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    (' III', 4 , 'iii.jpg', 'iii.jpg');
insert into shields
    (nombre,tiposhieldid,imagen,pines)
values
    (' IV', 4, 'iv.jpg', 'iv.jpg');

insert into rols
    (nombre)
values
    ('admin');
insert into rols
    (nombre)
values
    ('usuario');
insert into rols
    (nombre)
values
    ('visita');

insert into users
    (nombre,apellidop,apellidom,dni,email,password,rolid)
values('admin', 'admin', 'admin', '10101010', 'admin@admin.com', '$2a$10$kzpPck0LI9v4kHhu4tSpz.r062sWJjnW82GwEH/wIgjtC/H/k0U9K', 1),
    ('guillermo', 'Cabana', 'caceres', '10671906', 'guillecabana@hotmail.com', '$2a$10$kzpPck0LI9v4kHhu4tSpz.r062sWJjnW82GwEH/wIgjtC/H/k0U9K', 1);
--clave:95258300