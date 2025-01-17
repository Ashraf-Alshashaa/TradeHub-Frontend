import { FC, useEffect, useState } from "react";
import "./products.css";
import FilterBy from "../../components/filter-by/Filter-by";
import ProductCard from "../../components/product-card/Product-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { AppDispatch, RootState } from "../../app/store";
import { fetchPriceRange } from "../../features/pricerange/priceRangeSlice";
import { fetchCategories } from "../../features/categories/categorySlice";
import { Product } from "../../features/products/types";
import NotificationWS from "../../components/notification/NotificationContainer";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorComponent from "../../components/error/Error";

const Test: FC = () => {
  const navigate = useNavigate();
  const cardClicked = (id: number) => navigate(`/product/${id}`);

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { min_price, max_price } = useSelector(
    (state: RootState) => state.pricerange
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  const location = useLocation();

  // Function to fetch filtered products
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

  // Fetch products based on URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search") || "";
    const category = urlParams.get("category") || null;
    const minPrice = parseInt(
      urlParams.get("min_price") || min_price.toString()
    );
    const maxPrice = parseInt(
      urlParams.get("max_price") || max_price.toString()
    );

    fetchFilteredProducts(search, category ? parseInt(category) : null, [
      minPrice,
      maxPrice,
    ]);
  }, [location.search]);
  
  const localStorageUser = localStorage.getItem("user");
  const user_id = localStorageUser ? JSON.parse(localStorageUser).user_id : null;

  const chunkArray = (arr: any[], size: number) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  const chunkedProducts = chunkArray(products, 3);

  if (error) return <ErrorComponent msg={error.detail} />;

  return (
    <div className="products">
      <div className="products-filter-by">
        <div className="products-filter-by-item">
          <FilterBy />
        </div>
      </div>
      <div className="prducts-cards">
      <NotificationWS user_id={user_id} />
        {chunkedProducts.map((row: any, rowIndex: number) => (
          <div key={rowIndex} className="row">
            {row.map((product: Product) => (
              <div key={product.id} className="col-4 mb-4">
                <ProductCard
                  photo={product.image}
                  name={product.name}
                  price={product.price}
                  seller_city={product.seller_city}
                  onClick={() => cardClicked(product.id)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
