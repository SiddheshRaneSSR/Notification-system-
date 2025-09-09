const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter/userRouter.js');
const notiRouter = require('./notiRouter/notiRouter.js');




router.use('/user',userRouter);
router.use('/noti',notiRouter);


module.exports = router;


