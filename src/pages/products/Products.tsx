import { FC, useEffect, useState } from "react";
import FilterBy from "../../components/filter-by/Filter-by";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProductCard from "../../components/product-card/Product-card";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { fetchPriceRange } from "../../features/pricerange/priceRangeSlice";
import { AppDispatch, RootState } from "../../app/store";

const Test: FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { min_price, max_price } = useSelector(
    (state: RootState) => state.pricerange
  );


  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  useEffect(() => {
    dispatch(fetchPriceRange());
  }, [dispatch]);
  const [priceRange, setPriceRange] = useState<[number, number]>([min_price, max_price]);
  
  useEffect(() => {
    dispatch(fetchProducts({
      min_price: priceRange[0],
      max_price: priceRange[1]
    }));
  }, [dispatch, priceRange]);

  
console.log(products)
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
  const handlePriceChange = (value: [number, number]) => {
    console.log("Price range changed:", value);
  };

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

  // if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="Products">
      <Header />
      <div className="row">
        <div className="col-3">
        <FilterBy categories={categories} priceRange={priceRange} onPriceChange={handlePriceChange} />
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
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer
        githubUrl="https://github.com/Ashraf-Alshashaa/TradeHub-Frontend"
        email="your.email@example.com"
      />
    </div>
  );
};

export default Test;
