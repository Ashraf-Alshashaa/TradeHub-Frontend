import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import DropdownMenu from '../components/dropdown/Dropdown';

enum ProductCondition {
    New = 'New',
    GoodAsNew = 'Good as new',
    Used = 'Used',
  }


function EditProduct() {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCondition, setProductCondition] = useState(""); // Initial state set to 'New'
  const [selectedCategories, setSelectedCategories] =  useState<string[]>([]);


  // Fetch from backend
  const existingData = {
    productName: "sofa",
    productDescription: "very modern",
    productPrice: "677",
    productImage: "sofa_for_life.jpg",
    productCondition: "New",
    selectedCategories: ["Furniture"],
  };

  useEffect(() => {
    // Set initial values when modal opens
    setProductName(existingData.productName);
    setProductDescription(existingData.productDescription);
    setProductPrice(existingData.productPrice);
    setProductImage(existingData.productImage);
    setProductCondition(existingData.productCondition);
    setSelectedCategories(existingData.selectedCategories);
  }, [show]);


  const handleProductNameChange = (value) => setProductName(value);
  const handleProductImageChange = (value) => setProductImage(value);
  const handleProductDescriptionChange = (value) => setProductDescription(value);
  const handleProductPriceChange = (value) => setProductPrice(value);

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
    // Logic to save changes (send to backend)
    console.log(`Saving changes for: 
      Name - ${productName}, 
      Description - ${productDescription}, 
      Price - ${productPrice}, 
      Image - ${productImage}, 
      Condition - ${productCondition}, 
      Category - ${selectedCategories}`); 
    handleClose();
  };
  
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

    const categories = ["Electronics", "Furniture", "Toys", "Clothes"];
  
    return (
      <>
        <CustomButton text="Edit Product" onClick={handleShow} buttonType='secondary'/>
  
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
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
                <h6>Product Categories</h6>
                <div className="d-flex flex-wrap">
                  {categories.map((category, index) => (
                    <label key={index} className="mx-4 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      &nbsp; {category}
                    </label>
                  ))}
                </div>
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
  

export default EditProduct;
