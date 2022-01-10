const { Router } = require("express");
const contr = require('../controllers/controller')


const router = Router();



router.get('/id', contr.addUser)
router.get('/sendList', contr.items)
router.post('/sendProd', contr.addProd)
router.post('/delOrder', contr.delOrder)




module.exports = router;
