/* Установить предварительно nodemon -g */
'use strict';
const express = require('express'), // наше приложение с использованием express
    app = express(), // запуск main страницы
    mongoose = require('mongoose'), // драйвер для подключения к mongodb
    path = require('path'), // дает возможность бегать по папкам
    logger = require('morgan'), // отслеживание ошибок
    bodyParser = require('body-parser'), // парсим в json запросы корректно
    cookieParser = require('cookie-parser'), // Парсер куки
    registration = require('./server/routers/users'); // роутер

/* Подключаем mongodb */
mongoose.connect('mongodb://localhost/leading-user', { useNewUrlParser: true }, (err, db) => {

    if (err) throw err;

    db.collection('users').find().toArray((err, result) => { // подключаемся к коллекции
        if (err) throw err;
        console.log('mongodb connected in collection success');
    });

    console.log('Mongodb working');
});
/* ------------------ */

/* Парсим в json */
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/* ------------- */

/* По этому маршруту делаем запросы */
app.use(['/reg'], registration);
/* ------------------ */

/* Поиск проекта и содержимого */
app.get('/', function(req, res) {
    res.sendfile('dist/index.html');
});

app.use('/', express.static(__dirname + '/dist'));
/*app.use('/game-table', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/html/game-table/game-table.html'));
    res.render('html/game-table/game-table.html', {title: 'Игровые новости'});
});*/
/* --------------------------- */

/* error 404 */
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/client/html/404/404.html');
});

/* error 500 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то сломалось!');
});

/* Запуск сервера по порту */
app.listen(3000, () => {
    console.log('Сервер запущен: localhost:3000');
});