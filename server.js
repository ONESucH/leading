'use strict';
const express = require('express'), // наше приложение с использованием express
    app = express(), // запуск main страницы
    router = express.Router(), // роутер
    mongoose = require('mongoose'), // драйвер для подключения к mongodb
    logger = require('morgan'), // отслеживание ошибок
    bodyParser = require('body-parser'), // парсим в json запросы корректно
    cookieParser = require('cookie-parser'), // Парсер куки
    users = require('./server/routers/users'); // роутер

/* Подключаем mongodb */
mongoose.connect('mongodb://localhost/leading-user', {useNewUrlParser: true}, (err, db) => {

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
app.use(['/reg'], users);
/* ------------------ */

/* Поиск проекта и компонент */
app.use('/', express.static(__dirname + '/dist/'));
app.use('/reg', (req, res) => {
});
/* --------------------------- */

/* error 500 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то сломалось!');
});

/* error 404 */
app.use((req, res, next) => {
    res.status(404).redirect('..');
});

/* Запуск сервера(должен совпадать с бекенд сервером) */
app.listen(3000, () => {
    console.log('Сервер запущен: localhost:3000');
});