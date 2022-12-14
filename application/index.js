// IMPORTS
const EJS = require('ejs');
const EXPRESS = require('express');
const DATABASE = require('./database/database.config');
const REDIS = require('redis');

// CONSTANTS
const SERVER_PORT = process.env.SERVER_PORT;
const HOST_NAME = '0.0.0.0';

const REDIS_URL = 'redis://caching_system:6379'

const THEME = process.env.SERVER_THEME || 'bg-light';
const APP = EXPRESS();

// DEFINITIONS
APP.use(EXPRESS.static('public'))
APP.use('/css', EXPRESS.static(__dirname + 'public/css'));
APP.use('/js', EXPRESS.static(__dirname + 'public/js'));
APP.set('views', './views');
APP.set('view engine', 'ejs');

// VIEWS
APP.get('', async (req, res) => {
    // CACHING SYSTEM
    const REDIS_CLIENT = REDIS.createClient({ url: REDIS_URL });
    await REDIS_CLIENT.connect()

    REDIS_CLIENT.set('Message', 'Hello world from cache system!')
    const cache_message = await REDIS_CLIENT.get("Message")

    // DATABASE
    DATABASE.getConnection(async function (err, connection) {
        if (err) {
            res.render('index', {
                port: SERVER_PORT,
                connection: 'FAILED',
                theme: THEME,
                cache_message: cache_message
            });            
        } else {
            res.render('index', {
                port: SERVER_PORT,
                connection: 'SUCCESS',
                theme: THEME,
                cache_message: cache_message
            });
        }
    })
    REDIS_CLIENT.quit()
})

// START SERVER
APP.listen(SERVER_PORT, HOST_NAME, () => {
    console.info(`Listening on port ${SERVER_PORT}`);
})
