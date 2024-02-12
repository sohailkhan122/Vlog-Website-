const express = require('express')
const { registerController, loginConreoller, getSingleDocument, updateUserProfile } = require('../Controller/userBlogController')
const multer = require('multer');

const Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Router.post('/userSignUp', upload.single('file'), registerController);
Router.post('/login', loginConreoller);
Router.get('/getSingleDocument/:id', getSingleDocument)
Router.put('/updateUserProfile', upload.single('file'), updateUserProfile);

module.exports = Router;    