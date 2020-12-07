const http = require('http');
const express = require('express');
const morgan = require('morgan');
const webServerConfig = require('../config/web_server');
var methodOverride = require('method-override');
var cors = require('cors');

const router = require('./router.js');
let httpServer;
const app = express();

function initialize(){
    return new Promise((resolve, reject) => {
        httpServer = http.createServer(app);

        // Combina informações de registro de solicitação e resposta
        app.use(morgan('combined'));

        // Montar o roteador em / api para que todas as rotas comecem com / api
        // app.use('/api', require('cors')(),router);
        app.use('/api', cors(), router);
        app.use(methodOverride());

        var hostName = webServerConfig.hostname;
        var port = webServerConfig.port;

        //Inicia o servidor e ficar escutando as requisições no hostname e porta
        httpServer.listen(port, hostName)
            .on('listening', () => {
                console.log('Server running at http://'+hostName+':'+port+'/api/');
                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}
module.exports.initialize = initialize;