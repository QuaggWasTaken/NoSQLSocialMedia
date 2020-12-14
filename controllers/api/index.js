const router = require('express').Router();

const userRoutes = require('./User');
const thoughtRoutes = require('./Thought');


router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {
    res.status(404).end();
});


module.exports = router; 