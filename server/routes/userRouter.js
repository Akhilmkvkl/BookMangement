const express = require("express");
const router = express.Router();

const userCtrl=require('../controllers/userCtrl')


router.get('/getbooks',userCtrl.getbooks)


module.exports=router
