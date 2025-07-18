import express from 'express';
import {
    getBalances,
    getSettlements
} from '../controllers/settlementController.js';

const router = express.Router();

router.route('/balances')
    .get(getBalances);

router.route('/settlements')
    .get(getSettlements);

export default router;