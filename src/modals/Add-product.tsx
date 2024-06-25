import { useState } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import DropdownMenu from '../components/dropdown/Dropdown';
import Textarea from "../components/textarea/Textarea.tsx";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    // SEND TO BACKEND
    console.log(`Saving new product: 
      Name - ${productName}, 
      Image - ${productImage}, 
      Description - ${productDescription}, 
      Condition - ${productCondition}, 
      Category - ${selectedCategory}`);
    handleClose();
    
    setProductName("");
    setProductImage("");
    setProductDescription("");
    setProductCondition(ProductCondition.New); // Reset condition to 'New'
    setProductPrice("");
    setSelectedCategory(null);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Furniture" },
    { id: "3", name: "Toys" },
    { id: "4", name: "Clothes" },
  ];

  const CategoryDropdownData = categories.map(category => ({
    id: category.id,
    onClick: () => handleCategoryChange(category.id),
    content: category.name,
  }));

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
                label="Product Price"
                value={productPrice}
                onChange={handleProductPriceChange}
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
