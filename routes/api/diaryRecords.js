const router = require('express').Router();

const ctrl = require('../../controllers/diaryRecords');
const { validateBody, authenticate, validateParams } = require('../../middlewares');

const { schemas } = require('../../models/diaryRecord');

// get specific record, by date for authorized user
router.get(
    '/:date',
    authenticate,
    validateParams(schemas.checkDateSchema),
    ctrl.getCurrentDiaryRecord
);

// add exercise to diary
router.post(
    '/add-exercise',
    authenticate,
    validateBody(schemas.addDiaryExerciseSchema),
    ctrl.addDiaryExercise
);

// add product to diary
router.post(
    '/add-product',
    authenticate,
    validateBody(schemas.addDiaryProductSchema),
    ctrl.addDiaryProduct
);

module.exports = router;
