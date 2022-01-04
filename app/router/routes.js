const express = require("express")
const multer = require("multer");
const router = express.Router()

const uploadConfig = require("../config/upload")

const upload = multer(uploadConfig);


//Controllers

const CompereControllers = require("../controllers/App/CreateController")

const KycAdmim = require('../controllers/Web/AdminKYC')

router.post('/biupload/:id', upload.single('imagem'), CompereControllers.register)
router.get('/biupload', CompereControllers.register)
router.get('/getkyc/:id', CompereControllers.indexOne)

///
router.get('/kyclist', KycAdmim.index)
router.get('/kycdetail/:id', KycAdmim.indexOne)
router.put('/kycdetail/:id', KycAdmim.update)

//
router.get("/sign-review/:id", KycAdmim.sign)
router.post("/sign-review/:id", KycAdmim.aprove)


module.exports = router