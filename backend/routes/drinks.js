const { Router } = require('express');
const controller = require('../controllers/drinksController');

const router = Router();

router.get('/category', controller.getAvailableDrinksCategories); 
router.get('/category/:categoryName', controller.getAvailableDrinksByCategory); 

router.get('/', controller.getDrinksAll);
router.post('/', controller.addDrinks); 

router.get('/:id', controller.getDrinksById); 
router.put('/:id', controller.updateDrinksById); 
router.delete('/:id', controller.deleteDrinksById); 



module.exports = router;