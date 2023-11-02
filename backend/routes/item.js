const { Router } = require('express');
const controller = require('../controllers/itemController');

const router = Router();

router.post('/price', controller.getItemPrice); 

router.get('/', controller.getItemAll);
router.post('/', controller.addItem); 

router.get('/:id', controller.getItemById); 
router.put('/:id', controller.updateItemById); 
router.delete('/:id', controller.deleteItemById);

module.exports = router;