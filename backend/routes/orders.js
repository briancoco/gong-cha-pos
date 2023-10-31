const { Router } = require('express');
const controller = require('../controllers/ordersController');

const router = Router();

router.get('/', controller.getOrdersAll);
router.post('/', controller.addOrders); 

router.get('/:id', controller.getOrdersById); 
router.put('/:id', controller.updateOrdersById); 
router.delete('/:id', controller.deleteOrdersById); 

module.exports = router;