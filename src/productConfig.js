// const productPhotoPaths = {
//     "audi.png": require('../src/images/audi.png'),
//    "toyota.png":require('../src/images/toyota.png'),
  //  "jeep.png":require('../src/images/jeep.png'),
  //  "insertt.png":require('../src/images/product_photo-1702468772997-110445348.png'),
  //  "product_photo-7.PNG":require('../src/images/product_photo-7.PNG'),
  //  "product_photo-10.PNG":require('../src/images/product_photo-10.PNG'),

  //  "product_photo-12.PNG":require('../src/images/product_photo-12.PNG'),
  //  "product_photo-14.png":require('../src/images/product_photo-14.png'),

//     // Add other images in a similar way based on your data
//   };
  
//   export default productPhotoPaths;
const productPhotoPaths = {
  "audi.png": null,
  "toyota.png": null,
  "jeep.png":null,
   "insertt.png":null,
   "product_photo-7.PNG":null,
   "product_photo-10.PNG":null,
   "product_photo-12.PNG":null,
   "product_photo-14.png":null,
   "product_photo-15.PNG":null,
   "product_photo-17.png":null,
   "product_photo-18.png":null,
   "product_photo-20.png":null,
   "product_photo-21.png":null,
   "product_photo-23.PNG":null,
   "product_photo-25.PNG":null,
   "product_photo-26.PNG":null,
   "product_photo-26.PNG":null,
   "post_photo-27.PNG":null,
   "post_photo-28.PNG":null,
   "post_photo-29.PNG":null,
   "post_photo-31.png":null,
   "post_photo-32.png":null,
"product_photo-47.png":null,
"post_photo-49.png":null,
"post_photo-58.png":null,
"product_photo-59.png":null,
"product_photo-55.png":null,
"post_photo-59.png":null,
"post_photo-62.png":null,
"post_photo-67.png":null,
"product_photo-48.png":null,
"product_photo-68.png":null,
"product_photo-70.png":null,
"product_photo-49.png":null,
"post_photo-69.png":null,
"post_photo-74.png":null,
"product_photo-73.png":null,


"logo1.png":null







  // ... other image paths

  // Add other images in a similar way based on your data
};

function importImageIfExists(imagePath) {
  try {
    const image = require(`../src/images/${imagePath}`);
    return image;
  } catch (error) {
    // Image doesn't exist, do nothing
    return null;
  }
}

// Check and import each image
for (const key in productPhotoPaths) {
  if (Object.prototype.hasOwnProperty.call(productPhotoPaths, key)) {
    productPhotoPaths[key] = importImageIfExists(key);
  }
}

export default productPhotoPaths;
