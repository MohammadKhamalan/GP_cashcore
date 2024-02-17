// import React, { useState, useEffect } from 'react';
// import { makeRequest } from '../axios';
// import './Products.scss';
// import productPhotoPaths from '../productConfig';
// import { motion, AnimatePresence } from 'framer-motion'; // Import motion-related components


// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     product_name: '',
//     product_description: '',
//     product_price: '',
//     product_category: '',
//     product_photo: '',
//   });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await makeRequest.get('/product');
//         setProducts(response.data);
//         console.log(response.data)
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleDelete = async (product_id) => {
//     try {
//       await makeRequest.delete(`/product/${product_id}`);
//       const updatedResponse = await makeRequest.get('/product');
//       setProducts(updatedResponse.data);
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
  
//     // If the input is of type file, handle it separately for product_photo
//     if (type === 'file') {
//       setNewProduct({ ...newProduct, product_photo: files[0] });
//     } else {
//       setNewProduct({ ...newProduct, [name]: value });
//     }
//   };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setNewProduct({ ...newProduct, product_photo: file });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('product_name', newProduct.product_name);
//       formData.append('product_description', newProduct.product_description);
//       formData.append('product_price', newProduct.product_price);
//       formData.append('product_category', newProduct.product_category);
//       formData.append('product_photo', newProduct.product_photo);
  
//       const response = await makeRequest.post('/product', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       // Handle the response or perform any necessary actions
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };
  
  
  
//   return (
//     <div className="products-container">
//       <h1>All Products</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Product Name"
//           name="product_name"
//           value={newProduct.product_name}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           placeholder="Product Description"
//           name="product_description"
//           value={newProduct.product_description}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           placeholder="Price"
//           name="product_price"
//           value={newProduct.product_price}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           name="product_category"
//           value={newProduct.product_category}
//           onChange={handleInputChange}
//         />
// <input type="file" name="product_photo" onChange={handleFileChange} />
//         <button type="submit">Add Product</button>
//       </form>
//       <div className="products-list">
//       <AnimatePresence>
//   {products.map((product) => (
//     <motion.div
//       key={product.product_id}
//       className="product-box"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <img src={productPhotoPaths[product.product_photo] || null} alt="Product" />
//       <div className="category">
//         <p><strong>Category:</strong> {product.product_category}</p>
//       </div>
//       <div className="product-details">
//         <div className="name-price">
//           <strong>{product.product_name}</strong>
//           <p> {product.product_price} <strong>JOD</strong></p>
//         </div>
//         <p>{product.product_description}</p>
//         <button
//           className="delete-button"
//           onClick={() => handleDelete(product.product_id)}
//         >
//           Delete
//         </button>
//         {/* Render other product details and fields as needed */}
//       </div>
//     </motion.div>
//   ))}
// </AnimatePresence>


//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect } from 'react';
import { makeRequest } from '../axios';
import './Products.scss'; // Your SCSS file for styling
import productPhotoPaths from '../productConfig';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    product_category: '',
    product_photo: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await makeRequest.get('/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product_id) => {
    try {
      await makeRequest.delete(`/product/${product_id}`);
      const updatedResponse = await makeRequest.get('/product');
      setProducts(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setNewProduct({ ...newProduct, product_photo: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewProduct({ ...newProduct, product_photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('product_name', newProduct.product_name);
      formData.append('product_description', newProduct.product_description);
      formData.append('product_price', newProduct.product_price);
      formData.append('product_category', newProduct.product_category);
      formData.append('product_photo', newProduct.product_photo);

      const response = await makeRequest.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response or perform any necessary actions
      console.log(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const showAddProductForm = () => {
    setShowForm(true);
  };
  const hideAddProductForm = () => {
    setShowForm(false);
  };
  return (
    <div className="products-container">
    {!showForm ? (
      <button onClick={showAddProductForm} className='show'>Add Product</button>
    ) : (
      
      <form className="product-form" onSubmit={handleSubmit}>

        {/* Your input fields */}
        <input type="text" placeholder="Product Name" name="product_name" onChange={handleInputChange} />
        <input
          type="text"
          placeholder="Product Description"
          name="product_description"
          onChange={handleInputChange}
        />
        <input type="text" placeholder="Price" name="product_price" onChange={handleInputChange} />
        <input type="text" placeholder="Category" name="product_category" onChange={handleInputChange} />
        <div class="form-footer">
    <input type="file" name="product_photo" onChange={handleFileChange} />
    <div class="button-group">
      <button onClick={hideAddProductForm} className='back'>Back</button>
      <button type="submit" className='add'>Add Product</button>

    </div>
  </div>

      </form>
    )}
      <h1>All Products</h1>
      <div className="products-list">
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product.product_id}
              className="product-box"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={productPhotoPaths[product.product_photo] || null} alt="Product" />
              <div className="category">
                <p><strong>Category:</strong> {product.product_category}</p>
              </div>
              <div className="product-details">
                <div className="name-price">
                  <strong>{product.product_name}</strong>
                  <p>{product.product_price} <strong>JOD</strong></p>
                </div>
                <p>{product.product_description}</p>
                <button className="delete-button" onClick={() => handleDelete(product.product_id)}>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
