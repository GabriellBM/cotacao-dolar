const cotacaoDolar = require("../ws_apis/cotacaoDolar");

//By Gabriel 18/11/2020

//função que utiliza callback para receber os dados da ws_apis
async function getCotacaoDolar(req, res, next){
    try {
        await cotacaoDolar.getCotacaoDolar(function(err, data){
            if(err){
                return res.send(err).end();
            }
            console.log(data);
            res.send(data);
        });
    } catch (err) {
        next(err);
    }
}
module.exports.getCotacaoDolar = getCotacaoDolar;