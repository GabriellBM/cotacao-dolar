const webServer = require('./services/web_server.js');

async function startup(){
    try {
        console.log('Inicializando web server module');
        await webServer.initialize();
    } catch (err) {
        console.error(err);
        loggererror.error("\nErro:", err + '\r\n');
        process.exit(1); // Código de falha diferente de zero
    }
}

startup();