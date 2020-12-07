const express = require('express');
const router = new express.Router();

const contacaoDolar = require('../controller/cotacaoDolar');

router.use(express.json());

//---------------------------ROTAS COTACAODOLAR BY GABRIEL 18/11/2020---------------------------
router.route('/cotacaodolar/getcotacaodolar').get(contacaoDolar.getCotacaoDolar);

module.exports = router;