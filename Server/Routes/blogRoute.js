const express = require('express')
const { createBlogController, getAllBlogsController, getSingleBlogController, updateBlogController, deleteBlogController } = require('../Controller/blogController')
const multer = require('multer');

const Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Router.post('/createBlog', upload.single('image'), createBlogController);
Router.get('/getAllBlogsController', getAllBlogsController)
Router.get('/getSingleBlogController/:id', getSingleBlogController)
Router.put('/updateBlogController/:id', upload.single('file'), updateBlogController);
Router.delete('/deleteBlogController/:id', deleteBlogController)

module.exports = Router;    