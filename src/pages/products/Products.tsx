import { FC, useEffect, useState } from "react";
import FilterBy from "../../components/filter-by/Filter-by";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProductCard from "../../components/product-card/Product-card";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { AppDispatch, RootState } from "../../app/store";

const Test: FC = () => {
  interface ProductProps {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    date: Date;
    condition: string;
    category_id: number;
  }
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const handlePriceChange = (value: [number, number]) => {
    console.log("New price range:", value);
    setPriceRange(value);
  };
  const cardClicked = () => alert("Card clicked");
  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Auto and Parts",
    "Toys",
    "Books",
    "Sports Equipment",
    "Groceries",
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchFilteredProducts = () => {
      dispatch(fetchProducts({
        min_price: priceRange ? priceRange[0] : undefined,
        max_price: priceRange ? priceRange[1] : undefined
        }));
      };

    fetchFilteredProducts();
  }, [dispatch, priceRange]);

  const chunkArray = (arr: any[], size: number) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  // Chunk products into rows of 3 columns each
  const chunkedProducts = chunkArray(products, 3);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="Products">
      <Header />
      <div className="row">
        <div className="col-3">
          <FilterBy onPriceChange={handlePriceChange} categories={categories} />
        </div>

        <div className="col-9 my-4 overflow-auto scrollable-products">
          {chunkedProducts.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="row mb-5">
              {row.map((product: ProductProps) => (
                <div key={product.id} className="col-4 mb-4">
                  <ProductCard
                    photo={product.image}
                    name={product.name}
                    price={product.price}
                    location={"Amsterdam"}
                    onClick={cardClicked}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer
        githubUrl="https://github.com/yourprofile"
        email="your.email@example.com"
      />
    </div>
  );
};

export default Test;
