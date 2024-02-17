// import { fileURLToPath } from 'url';
// import { dirname, join, extname } from 'path';
// import express from 'express';
// import multer from 'multer';
// import { createProductWithPhoto, deleteProduct, updateProduct, getAllProducts, getProductById, getProductsUnderAccountPrice } from '../controller/product.js'; // Import the controller function

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = join(__dirname, '../../src/images'); // Adjust the path accordingly
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     const fileExtension = extname(file.originalname);
//     cb(null, `product_photo-${uniqueSuffix}${fileExtension}`);
//   },
// });

// const upload = multer({ storage: storage });

// router.post('/', upload.single('product_photo'), (req, res, next) => {
//   console.log('Received product data:', req.body); // Debug: Check the received data
//   console.log('Received file:', req.file); // Debug: Check the received file information

//   const { product_name, product_description, product_price, product_category } = req.body;
//   const product_photo = req.file.filename; // Assuming 'filename' contains the uploaded file name

//   createProductWithPhoto(req, res, product_name, product_description, product_price, product_category, product_photo);
// });

// // ... (other routes)


// router.get('/', (req, res) => {
//     if (req.query.search) {
//         getProductById(req, res); // Call getProductById for searching
//     } else {
//         getAllProducts(req, res); // Call getAllProducts for retrieving all products
//     }
// });
// router.get('/underprice/:account_id', getProductsUnderAccountPrice);

// router.delete("/:id", deleteProduct);
// router.put("/:id",updateProduct);
// export default router;
import { createProductWithPhoto, deleteProduct, updateProduct, getAllProducts, getProductById, getProductsUnderAccountPrice } from '../controller/product.js'; // Import the controller function

import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import express from 'express';
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
      cb(null, `product_photo-${nextPhotoId}${fileExtension}`);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage: storage });

// Your routes
router.post('/', upload.single('product_photo'), (req, res, next) => {
  console.log('Received product data:', req.body); // Debug: Check the received data
  console.log('Received file:', req.file); // Debug: Check the received file information

  const { product_name, product_description, product_price, product_category } = req.body;
  const product_photo = req.file.filename; // Assuming 'filename' contains the uploaded file name

  createProductWithPhoto(req, res, product_name, product_description, product_price, product_category, product_photo);
});
// ... (other routes)


router.get('/', (req, res) => {
    if (req.query.search) {
        getProductById(req, res); // Call getProductById for searching
    } else {
        getAllProducts(req, res); // Call getAllProducts for retrieving all products
    }
});
router.get('/underprice/:account_id', getProductsUnderAccountPrice);

router.delete("/:id", deleteProduct);
router.put("/:id",updateProduct);
export default router;