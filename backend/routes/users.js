const { Router } = require('express');
const controller = require('../controllers/usersController');

const router = Router();

router.get('/', controller.getUsersAll);
router.post('/', controller.addUsers); 

router.get('/:id', controller.getUsersById); 
router.put('/:id', controller.updateUsersById); 
router.delete('/:id', controller.deleteUsersById); 

module.exports = router;