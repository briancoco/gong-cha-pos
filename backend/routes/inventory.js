const { Router } = require('express');
const controller = require('../controllers/inventoryController');

const router = Router();

router.get('/', controller.getInventoryAll);
router.post('/', controller.addInventory); 

router.get('/:id', controller.getInventoryById); 
router.put('/:id', controller.updateInventoryById); 
router.delete('/:id', controller.deleteInventoryById); 

module.exports = router;