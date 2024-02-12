const createBlog = require('../Models/blog.Model');

const createBlogController = async (req, res) => {
    const { content, title, userCreate, userCreateName } = req.body;
    const image = req.file;

    try {
        const newBlog = new createBlog({
            content,
            title,
            userCreate,
            userCreateName,
            image: {
                data: image.buffer,
                contentType: image.mimetype,
            },
        });

        await newBlog.save();

        res.status(201).json({ success: true, message: 'Blog created successfully.', blog: newBlog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ success: false, message: 'Failed to create blog. Please try again.' });
    }
};

const getAllBlogsController = async (req, res) => {
    try {
        const allBlogs = await createBlog.find();

        res.status(200).json({ success: true, message: 'Blogs retrieved successfully.', blogs: allBlogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch blogs. Please try again.' });
    }
};

const getSingleBlogController = async (req, res) => {
    const { id } = req.params
    console.log(req.params)

    try {
        const blog = await createBlog.findById(id);

        if (blog) {
            res.status(200).json({ success: true, blog });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found.' });
        }
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch blog. Please try again.' });
    }
};

const updateBlogController = async (req, res) => {
    const { id } = req.params;
    const { content, title } = req.body;
    const image = req.file;
    console.log(image)

    try {
        let existingBlog = await createBlog.findById(id);

        if (!existingBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }

        if (content) existingBlog.content = content;
        if (title) existingBlog.title = title;
        if (image) {
            existingBlog.image = {
                data: image.buffer,
                contentType: image.mimetype,
            };
        }

        await existingBlog.save();

        res.status(200).json({ success: true, message: 'Blog updated successfully.', blog: existingBlog });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ success: false, message: 'Failed to update blog. Please try again.' });
    }
};

const deleteBlogController = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await createBlog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }

        res.status(200).json({ success: true, message: 'Blog deleted successfully.', blog: deletedBlog });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ success: false, message: 'Failed to delete blog. Please try again.' });
    }
};


module.exports = { createBlogController, getAllBlogsController, getSingleBlogController, updateBlogController, deleteBlogController };
