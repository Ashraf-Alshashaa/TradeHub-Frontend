import { useState } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import DropdownMenu from '../components/dropdown/Dropdown';
import Textarea from "../components/textarea/Textarea.tsx";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store.ts';
import { createProduct } from '../features/products/productsSlice.ts';
import { AddProductProps } from './types.ts';


// Define the enum for product conditions
enum ProductCondition {
  New = 'new',
  GoodAsNew = 'good as new',
  Used = 'used',
}

const AddProduct: React.FC<AddProductProps> = ({ show, handleClose, user }) => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState <string | null>(null);
  const [productCondition, setProductCondition] = useState<ProductCondition>(ProductCondition.New); // Initial state set to 'New'
  const [productPrice, setProductPrice] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();


  const handleProductNameChange = (value) => setProductName(value);
  const handleProductImageChange = (value) => setProductImage(value);
  const handleProductDescriptionChange = (event) => setProductDescription(event.target.value);
  const handleProductPriceChange = (value) => setProductPrice(value);

  const handleProductConditionChange = (condition: ProductCondition) => {
    setProductCondition(condition);
  };

  const Conditions = [
    {
      id: "1",
      onClick: () => handleProductConditionChange(ProductCondition.New),
      content: "New",
    },
    {
      id: "2",
      onClick: () => handleProductConditionChange(ProductCondition.GoodAsNew),
      content:"Good as new",
    },
    {
      id: "3",
      onClick: () => handleProductConditionChange(ProductCondition.Used),
      content: "Used",
    },
  ];


  const handleSave = () => {
    if (!productName || !productPrice || !selectedCategory || !productCondition || !productImage || !productDescription) {
      alert("Please fill all required fields.");
      return;
    }
   
    const newProduct = {
      name: productName,
      image: productImage,
      description: productDescription,
      seller_id: user?.user_id,
      buyer_id: null,
      date: new Date().toISOString(),
      condition: productCondition,
      price: parseFloat(productPrice), // Assuming the price is a number
      category_id: selectedCategory,
    };
    console.log('Saving new product:', newProduct);

    console.log('User before saving product:', user); // Add this line for debugging


    if (user?.user_id) {
      dispatch(createProduct(newProduct));
      handleClose();
    
      setProductName("");
      setProductImage("");
      setProductDescription("");
      setProductCondition(ProductCondition.New); // Reset condition to 'New'
      setProductPrice("");
      setSelectedCategory(null);
    } else {
      console.error('User is not defined. Cannot save product.');
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Furniture" },
    { id: 3, name: "Toys" },
    { id: 4, name: "Clothes" },
  ];

  const CategoryDropdownData = categories.map(category => ({
    id: category.id,
    onClick: () => handleCategoryChange(category.id),
    content: category.name,
  }));

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-8 mt-2'>
              <TextInput
                label="Product Name"
                value={productName}
                onChange={handleProductNameChange}
                type="text"
              />
            </div>
            <div className='col-4 mt-2'>
              <TextInput
                label="Price"
                value={productPrice}
                onChange={(n) => handleProductPriceChange(n)}
                type="price"
              />
            </div>
            <div className='col-12 mt-2'>
              <TextInput
                label="Product Image URL"
                value={productImage}
                onChange={handleProductImageChange}
                type="text"
              />
            </div>
            <div className='col-12 mt-2'>
              <Textarea
                label="Description"
                required={false}
                onChange={handleProductDescriptionChange}
              />
            </div>
            <div className='col-6 mt-2'>
              <h6>Product Condition</h6>
              <DropdownMenu data={Conditions} title="Choose Condition" />
            </div>
            <div className='col-6 mt-2'>
              <h6>Product Category</h6>
              <DropdownMenu data={CategoryDropdownData} title="Choose Category" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text='Save' buttonType="primary" onClick={handleSave}/>
          <CustomButton text='Close' buttonType="secondary" onClick={handleClose}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
