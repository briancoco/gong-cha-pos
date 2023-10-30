const { Router } = require('express');
const controller = require('../controllers/drinksController');

const router = Router();

router.get('/', controller.getDrinksAll);
router.post('/', controller.addDrinks); // Specify formatting

router.get('/:id', controller.getDrinksById); 
router.put('/:id', controller.updateDrinksById); //Specify formatting
router.delete('/:id', controller.deleteDrinksById); // Specify formatting

module.exports = router;