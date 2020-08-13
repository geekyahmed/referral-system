const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isUserAuthenticated} = require("../config/customFunctions");


router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'user';

    next();
});

/* DEFAULT USER INDEX ROUTE*/

router.route('/')
    .get(userController.index);


/* VARIOUS USER POST ENDPOINTS */

router.route('/courses')
    .get(userController.getCourses);


router.route('/courses/create')
    .get(userController.getCreateCoursePage)
    .post(userController.submitCreateCoursePage);


router.route('/courses/edit/:id')
    .get(userController.getEditCoursePage)
    .put(userController.submitEditCoursePage);


router.route('/courses/delete/:id')
    .delete(userController.deleteCourse);



/* USER COMMENT ROUTES */
router.route('/comment')
    .get(userController.getComments)
    .post(userController.approveComments);

module.exports = router;

