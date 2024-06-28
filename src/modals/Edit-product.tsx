import { useState, useEffect, FC } from "react";
import CustomButton from "../components/button/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "../components/text-input/Text-input";
import DropdownMenu from "../components/dropdown/Dropdown";
import { EditProductProps, ProductCondition } from "./types";
import { DropdownItemProps } from "../components/dropdown/types.ts";
import { updateProduct } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchCategories } from "../features/categories/categorySlice";
import Textarea from "../components/textarea/Textarea";
import { fetchProductById } from "../features/products/productsSlice";

const EditProduct: FC<EditProductProps> = ({ existingData }) => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState<string | null>();
  const [productPrice, setProductPrice] = useState<number>();
  const [productImage, setProductImage] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number>();
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

  const handleProductNameChange = (value: string) => setProductName(value);
  const handleProductImageChange = (value: string) => setProductImage(value);
  const handleProductPriceChange = (value: number) => setProductPrice(value);

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
      content: "Used",
    },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { categories } = useSelector((state: RootState) => state.categories);

  const CategoryDropdownData: DropdownItemProps[] = categories.map(
    (category) => ({
      id: category.id.toString(),
      onClick: () => setSelectedCategories(category.id),
      content: category.name,
    })
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (!isFormValid) {
      alert("Please fill out all required fields.");
      return;
    }

    dispatch(
      updateProduct({
        id: existingData.id,
        productData: {
          name: productName,
          image: productImage,
          description: productDescription,
          seller_id: existingData.seller_id,
          buyer_id: null,
          price: productPrice,
          date: new Date(existingData.date),
          condition: productCondition as string,
          category_id: selectedCategories,
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchProductById(existingData.id));
      })
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
        alert("Please check all required fields.");
      });
  };

  return (
    <>
      <CustomButton
        text="Edit Product"
        onClick={handleShow}
        buttonType="secondary"
      />

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
          <div className="row">
            <div className="col-8 mt-2">
              <TextInput
                label="Product Name"
                value={productName}
                onChange={(s) => handleProductNameChange(s as string)}
                type="text"
                required={true}
              />
            </div>
            <div className="col-4 mt-2">
              <TextInput
                label="Price"
                value={productPrice}
                onChange={(n) => handleProductPriceChange(n as number)}
                type="price"
                required={true}
              />
            </div>
            <div className="col-12 mt-2">
              <TextInput
                label="Product Image URL"
                value={productImage}
                onChange={(s) => handleProductImageChange(s as string)}
                type="text"
                required={true}
              />
            </div>
            <div className="col-12 mt-2">
              <Textarea
                label="Product Description"
                required={false}
                onChange={(e) => setProductDescription(e.target.value)}
                defaultVlaue={existingData.description}
              />
            </div>
            <div className="col-6 mt-2">
              <h6>Product Condition</h6>
              <DropdownMenu
                data={Conditions}
                title="Choose Condition"
                selector={true}
              />
            </div>
            <div className="col-6 mt-2">
              <h6>Product Categories</h6>
              <DropdownMenu
                data={CategoryDropdownData}
                title="Choose Category"
                selector={true}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text="Save" buttonType="primary" onClick={handleSave} />
          <CustomButton
            text="Close"
            buttonType="secondary"
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProduct;
