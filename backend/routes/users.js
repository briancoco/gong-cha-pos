const { Router } = require('express');
const controller = require('../controllers/usersController');

const router = Router();

router.get('/', controller.getUsersAll);
router.post('/', controller.addUsers); // Specify formatting

router.get('/:id', controller.getUsersById); 
router.put('/:id', controller.updateUsersById); //Specify formatting
router.delete('/:id', controller.deleteUsersById); // Specify formatting

module.exports = router;