import { useState, useEffect, FC } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../components/text-input/Text-input';
import DropdownMenu from '../components/dropdown/Dropdown';
import { EditProductProps } from './types';
import { updateProduct } from '../features/products/productsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../app/store";
import Textarea from '../components/textarea/Textarea';


enum ProductCondition {
    New = 'new',
    GoodAsNew = 'good as new',
    Used = 'used',
  }


const EditProduct: FC<EditProductProps> = ({existingData}) => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState <string | null>();
  const [productPrice, setProductPrice] = useState<number>();
  const [productImage, setProductImage] = useState("");
  const [productCondition, setProductCondition] = useState(""); // Initial state set to 'New'
  const [selectedCategories, setSelectedCategories] =  useState<number>();
  const [isFormValid, setIsFormValid] = useState(false);



  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    // Set initial values when modal opens
    setProductName(existingData.name);
    setProductDescription(existingData.description);
    setProductPrice(existingData.price);
    setProductImage(existingData.image);
    setProductCondition(existingData.condition);
    setSelectedCategories(existingData.category_id);
  }, [show, existingData]);

  useEffect(() => {
    checkFormValidity();
  }, [productName, productPrice, productImage]);

  const checkFormValidity = () => {
    if (productName && productPrice && productImage) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };


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
      content: "New",
    },
    {
      id: "2",
      onClick: () => handleProductConditionChange(ProductCondition.GoodAsNew),
      content: "Good as new",
    },
    {
      id: "3",
      onClick: () => handleProductConditionChange(ProductCondition.Used),
      content: "Used"
    },
  ];

  const Categories = [
    {
      id: "1",
      onClick: () => setSelectedCategories(1),
      content: "Electronics",
    },
    {
      id: "2",
      onClick: () => setSelectedCategories(2),
      content: "Furniture",
    },
    {
      id: "3",
      onClick: () => setSelectedCategories(3),
      content: "Toys",
    },
    {
      id: "4",
      onClick: () => setSelectedCategories(4),
      content: "Clothes",
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (!isFormValid) {
      alert("Please fill out all required fields.");
      return;
    }
  

    dispatch(updateProduct({id : existingData.id, productData: {
      name: productName,
      image: productImage,
      description: productDescription,
      seller_id: existingData.seller_id,
      buyer_id: null,
      price: productPrice,
      date: new Date(existingData.date),
      condition: productCondition as string,
      category_id: selectedCategories,  
    }}))
        .unwrap()
        .then(() => {
          console.log("Product updated successfully:");
          alert("Product updated successfully!");
          handleClose();
        })
        .catch((error) => {
          console.error("Failed to update product:", error);
          alert("Please check all required fields.");
        });
  };

  
  
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
              <div className='col-8 mt-2'>
                <TextInput
                  label="Product Name"
                  value={productName}
                  onChange={(s) => handleProductNameChange(s)}
                  type="text"
                  required={true}
                />
              </div>
              <div className='col-4 mt-2'>
                  <TextInput
                    label="Price"
                    value={productPrice}
                    onChange={(n) => handleProductPriceChange(n)}
                    type="price"
                    required={true}
                  />
              </div>
              <div className='col-12 mt-2'>
                <TextInput
                  label="Product Image URL"
                  value={productImage}
                  onChange={(s) => handleProductImageChange(s)}
                  type="text"
                  required={true}
                />
              </div>
              <div className='col-12 mt-2'>
                <Textarea
                    label="Product Description"
                    required={false}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className='col-6 mt-2'>
                  <h6>Product Condition</h6>
                  <DropdownMenu data={Conditions} title="Choose Condition" />
              </div>
              <div className='col-6 mt-2'>
                  <h6>Product Categories</h6>
                  <DropdownMenu data={Categories} title="Choose Category" />
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