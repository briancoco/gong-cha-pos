const { Router } = require('express');
const controller = require('../controllers/ordersController');

const router = Router();

router.get('/', controller.getOrdersAll);
router.post('/', controller.addOrders); // Specify formatting

router.get('/:id', controller.getOrdersById); 
router.put('/:id', controller.updateOrdersById); //Specify formatting
router.delete('/:id', controller.deleteOrdersById); // Specify formatting

module.exports = router;