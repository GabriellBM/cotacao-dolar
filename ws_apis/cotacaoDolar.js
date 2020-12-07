const request = require('request');


//função efetua um GET na api do banco cental, verifica o ultimo dia util da cotação e retorna um callback para o controlador.
function getCotacaoDolar(callback){
    var date = new Date();
    var dt_fechamento;
    if ((date.getDay() - 1) == 0) {
        dt_fechamento ="'"+(date.getMonth()+1)+"-"+(date.getDate()-3)+"-"+date.getFullYear()+"'";
    }else if ((date.getDay() - 1) == 6) {
        dt_fechamento ="'"+(date.getMonth()+1)+"-"+(date.getDate()-2)+"-"+date.getFullYear()+"'";
    }else{
        dt_fechamento ="'"+(date.getMonth()+1)+"-"+(date.getDate()-1)+"-"+date.getFullYear()+"'";
    }

    const host = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='+dt_fechamento+'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao';
    
    request(host, function(error, response, body){
        const err = {
            "StatusCode": 404,
            "Mensagem": "Consulta invalida! Tente novamente ou entre em contato com o Suporte."
        };
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);          
            return callback(result.value[0], false);
        } else {            
            return callback(null, err);
        }
    });
}
module.exports.getCotacaoDolar = getCotacaoDolar;