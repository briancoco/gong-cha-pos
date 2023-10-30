const { Router } = require('express');
const controller = require('../controllers/itemController');

const router = Router();

router.get('/', controller.getItemAll);
router.post('/', controller.addItem); // Specify formatting

router.get('/:id', controller.getItemById); 
router.put('/:id', controller.updateItemById); //Specify formatting
router.delete('/:id', controller.deleteItemById); // Specify formatting

module.exports = router;