import React, { useState } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import DropdownMenu from '../components/dropdown/Dropdown';

// Define the enum for product conditions
enum ProductCondition {
  New = 'New',
  GoodAsNew = 'Good as new',
  Used = 'Used',
}

function AddProduct() {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCondition, setProductCondition] = useState<ProductCondition>(ProductCondition.New); // Initial state set to 'New'
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleProductNameChange = (value) => setProductName(value);
  const handleProductImageChange = (value) => setProductImage(value);
  const handleProductDescriptionChange = (value) => setProductDescription(value);
  const handleProductPriceChange = (value) => setProductPrice(value);
  const handleProductCategoryChange = (value) => setProductCategory(value);

  // Handler for changing product condition using enum
  const handleProductConditionChange = (condition: ProductCondition) => {
    setProductCondition(condition);
  };

  const Conditions = [
    {
      id: "1",
      onClick: () => handleProductConditionChange(ProductCondition.New),
      content: ProductCondition.New,
    },
    {
      id: "2",
      onClick: () => handleProductConditionChange(ProductCondition.GoodAsNew),
      content: ProductCondition.GoodAsNew,
    },
    {
      id: "3",
      onClick: () => handleProductConditionChange(ProductCondition.Used),
      content: ProductCondition.Used,
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    // Logic to save the new product (e.g., send to backend)
    console.log(`Saving new product: 
      Name - ${productName}, 
      Image - ${productImage}, 
      Description - ${productDescription}, 
      Condition - ${productCondition}, 
      Price - ${productPrice}, 
      Category - ${productCategory}`);
    handleClose(); // Close modal after saving
    // Reset form fields if needed
    setProductName("");
    setProductImage("");
    setProductDescription("");
    setProductCondition(ProductCondition.New); // Reset condition to 'New'
    setProductPrice("");
    setProductCategory("");
  };

  return (
    <>
      <CustomButton text="Add Product" onClick={handleShow} buttonType='secondary'/>

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
            <div className='col-12 mt-2'>
              <TextInput
                label="Product Name"
                value={productName}
                onChange={handleProductNameChange}
                type="text"
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
              <TextInput
                label="Product Description"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                type="text"
              />
            </div>
            <div className='col-6 mt-2'>
              <h6>Product Condition</h6>
              <DropdownMenu data={Conditions} title="Choose Condition" />
            </div>
            <div className='col-6 mt-2'>
              <TextInput
                label="Product Price"
                value={productPrice}
                onChange={handleProductPriceChange}
                type="text"
              />
            </div>
            <div className='col-12 mt-2'>
              <TextInput
                label="Product Category"
                value={productCategory}
                onChange={handleProductCategoryChange}
                type="text"
              />
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
