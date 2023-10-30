const { Router } = require('express');
const controller = require('../controllers/inventoryController');

const router = Router();

router.get('/', controller.getInventoryAll);
router.post('/', controller.addInventory); // Specify formatting

router.get('/:id', controller.getInventoryById); 
router.put('/:id', controller.updateInventoryById); //Specify formatting
router.delete('/:id', controller.deleteInventoryById); // Specify formatting

module.exports = router;