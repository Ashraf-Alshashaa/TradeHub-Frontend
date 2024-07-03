import { useState, useEffect } from "react";
import CustomButton from "../components/button/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "../components/text-input/Text-input";
import DropdownMenu from "../components/dropdown/Dropdown";
import Textarea from "../components/textarea/Textarea.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store.ts";
import { createProduct } from "../features/products/productsSlice.ts";
import { fetchCategories } from "../features/categories/categorySlice"; // import your action
import { AddProductProps, ProductCondition } from "./types.ts";
import { DropdownItemProps } from "../components/dropdown/types.ts";
import CloudinaryUploadWidget from "../components/cloudinary-upload-widget/CloudinaryUploadWidget.tsx";

const AddProduct: React.FC<AddProductProps> = ({ show, handleClose, user }) => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState<string | null>(
    null
  );
  const [productCondition, setProductCondition] = useState<ProductCondition>(
    ProductCondition.New
  );
  const [productPrice, setProductPrice] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    checkFormValidity();
  }, [productName, productPrice, productImage, selectedCategory]);

  const checkFormValidity = () => {
    if (
      productName &&
      productPrice !== undefined &&
      productImage &&
      selectedCategory !== null
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleProductNameChange = (value: string) => setProductName(value);
  const handleProductImageChange = (value: string) => setProductImage(value);
  const handleProductDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setProductDescription(event.target.value);
  const handleProductPriceChange = (value: number) => setProductPrice(value);

  const handleProductConditionChange = (condition: ProductCondition) => {
    setProductCondition(condition);
  };

  const Conditions: DropdownItemProps[] = [
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

  const handleSave = () => {
    if (!isFormValid) {
      alert("Please fill all required fields.");
      return;
    }

    const newProduct = {
      name: productName,
      image: productImage,
      description: productDescription || "",
      seller_id: user?.user_id,
      buyer_id: null,
      date: new Date().toISOString(),
      condition: productCondition,
      price: productPrice, // Assuming the price is a number
      category_id: selectedCategory,
    };
    console.log("Saving new product:", newProduct);

    if (user?.user_id) {
      dispatch(createProduct(newProduct));
      handleClose();

      setProductName("");
      setProductImage("");
      setProductDescription("");
      setProductCondition(ProductCondition.New);
      setProductPrice(undefined);
      setSelectedCategory(null);
    } else {
      console.error("User is not defined. Cannot save product.");
      alert("Please check all required fields.");
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const CategoryDropdownData: DropdownItemProps[] = categories.map(
    (category) => ({
      id: category.id.toString(),
      onClick: () => handleCategoryChange(category.id),
      content: category.name,
    })
  );

  return (
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
        <div className="row">
          <div className="col-8 mt-2">
            <TextInput
              label="Product Name"
              value={productName}
              onChange={(value) => handleProductNameChange(value as string)}
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
          <CloudinaryUploadWidget onUpload={(url) => handleProductImageChange(url)}/>
          </div>
          <div className="col-12 mt-2">
            <Textarea
              label="Description"
              required={false}
              onChange={handleProductDescriptionChange}
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
            <h6>Product Category</h6>
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p>Error loading categories</p>
            ) : (
              <DropdownMenu
                data={CategoryDropdownData}
                title="Choose Category"
                selector={true}
              />
            )}
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
  );
};

export default AddProduct;
