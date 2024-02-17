import express from 'express';
import { createPost, deletePost, updatePost, getAllPosts, getPostById } from '../controller/post.js';
import { db } from '../connect.js'; // Import the db connection
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import multer from 'multer';
import fs from 'fs';

// Controller and other imports...
// ...

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

const getFilesInDirectory = () => {
  return new Promise((resolve, reject) => {
    const uploadPath = join(__dirname, '../../src/images');
    fs.readdir(uploadPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = join(__dirname, '../../src/images'); // Adjust the path accordingly
    cb(null, uploadPath);
  },
  filename: async function (req, file, cb) {
    try {
      const files = await getFilesInDirectory(); // Get all files in the directory
      const nextPhotoId = files.length + 1; // Calculate the next photo ID based on the existing files

      const fileExtension = extname(file.originalname);
      cb(null, `post_photo-${nextPhotoId}${fileExtension}`);
    } catch (error) {
      cb(error);
    }
  },
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      // Implement file type filtering if required
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
      }
    }
  }).single('post_photo');
  
  router.post('/', (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Multer-related errors
        console.error('Multer error:', err);
        return res.status(400).json({ error: 'File upload error', message: err.message });
      } else if (err) {
        // Other errors during file upload
        console.error('File upload error:', err);
        return res.status(500).json({ error: 'File upload error', message: err.message });
      }
  
      // If no file upload error, continue processing the post data
      console.log('Received post data:', req.body);
      console.log('Received file:', req.file);
  
      const { post_content } = req.body;
      const post_photo = req.file ? req.file.filename : null;
  
      createPost(req, res, post_content, post_photo);
    });
  });
  
  

  

router.get('/', (req, res) => {
    if (req.query.search) {
        getAllPosts(req, res); // If search term exists, use the getAllPosts function
    } else {
        // If no search term, return all posts
        // Your default route logic without the search functionality
        const query = "SELECT * FROM `posts`";
        db.query(query, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.json(result);
        });
    }
});


router.get('/:id', getPostById);
//router.post('/', createPost);

router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
