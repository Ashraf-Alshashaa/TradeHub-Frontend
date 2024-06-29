import { FC, useEffect, useState } from "react";
import "./products.css";
import FilterBy from "../../components/filter-by/Filter-by";
import ProductCard from "../../components/product-card/Product-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { fetchPriceRange } from "../../features/pricerange/priceRangeSlice";
import { fetchCategories } from "../../features/categories/categorySlice";
import { Product } from "../../features/products/types";

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

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const [categoryId, setCategoryId] = useState<number>();

  const handleCategoryChange = (id: number) => {
    setCategoryId(id);
  };

  useEffect(() => {
    dispatch(fetchPriceRange());
    dispatch(fetchCategories());
  }, [dispatch]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    min_price,
    max_price,
  ]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        min_price: priceRange[0],
        max_price: priceRange[1],
        category_id: categoryId,
      })
    );
  }, [dispatch, priceRange, categoryId]);

  const chunkArray = (arr: any[], size: number) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  const chunkedProducts = chunkArray(products, 3);

  if (error) return <h1>Error</h1>;

  return (
    <div className="products">
      <div className="products-filter-by">
        <div className="products-filter-by-item">
          <FilterBy
            categories={categories}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
      {loading ? (
        <h1 className="col-9 my-4 overflow-auto scrollable-products">
          Loading
        </h1>
      ) : (
        <div className="prducts-cards">
          {chunkedProducts.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="row">
              {row.map((product: Product) => (
                <div key={product.id} className="col-4 mb-4">
                  <ProductCard
                    photo={product.image}
                    name={product.name}
                    price={product.price}
                    location={"Amsterdam"}
                    onClick={() => cardClicked(product.id)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;
