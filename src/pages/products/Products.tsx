import { FC, useEffect, useState } from "react";
import "./products.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FilterBy from "../../components/filter-by/Filter-by";
import ProductCard from "../../components/product-card/Product-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { fetchPriceRange } from "../../features/pricerange/priceRangeSlice";
import { fetchCategories } from "../../features/categories/categorySlice";
import { RootState } from "../../app/store";
import { Product } from "../../features/products/types";
import { AppDispatch } from "../../app/store";
import { useLocation } from "react-router-dom";

const Test: FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { min_price, max_price } = useSelector(
    (state: RootState) => state.pricerange
  );
  const { categories } = useSelector( (state: RootState) => state.categories)

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([min_price, max_price]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();


  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleCategoryChange = (id: number| null) => {
    setCategoryId(id);
  };
 
  useEffect(() => {
    dispatch(fetchPriceRange());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search") || "";
    const category = urlParams.get("category") || null;

    setSearchQuery(search);
    setCategoryId(category ? parseInt(category) : null);

    fetchFilteredProducts(search, category ? parseInt(category) : null, priceRange);
  }, [location.search]);

  useEffect(() => {
    fetchFilteredProducts(searchQuery, categoryId, priceRange);
  }, [priceRange, categoryId, searchQuery]);

  const fetchFilteredProducts = (
    search: string,
    category: number | null,
    priceRange: [number, number]
  ) => {
    dispatch(
      fetchProducts({
        search_str: search,
        min_price: priceRange[0],
        max_price: priceRange[1],
        category_id: category,
      })
    );
  };



  const chunkArray = (arr: any[], size: number) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  const chunkedProducts = chunkArray(products, 3);

  // if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  

  return (
    <div className="Products">
      <Header />
      <div className="row">
        <div className="col-3">
        <FilterBy
          categories={categories}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          onCategoryChange={handleCategoryChange}
          selectedCategoryId={categoryId}
          />
        </div>

        <div className="col-9 my-4 overflow-auto scrollable-products">
          {chunkedProducts.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="row mb-5">
              {row.map((product: Product) => (
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
