const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addToFriendsList,
    deleteFromFriendsList
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser);

router
    .route('/:userId/:friendId')
    .post(addToFriendsList)
    .delete(deleteFromFriendsList);

module.exports = router;