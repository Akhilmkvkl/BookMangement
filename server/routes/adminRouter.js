const express = require("express");
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl')


router.post('/addbook', adminCtrl.addbook)
router.post('/deleteBook', adminCtrl.deleteBook)


module.exports = router