import { FC, useState, useEffect} from "react";
import { Range, getTrackBackground } from "react-range";
import "./filter-by.css";
import { FilterByProps } from "./types";
import axiosInstance from "../../axiosConfig";


const FilterBy: FC<FilterByProps> = ({ onPriceChange, categories }) => {
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPriceRange(); // Fetch initial price range when component mounts
  }, []);

  const fetchPriceRange = () => {
    setLoading(true);
    axiosInstance
      .get('/products/price-range')
      .then(response => {
        const { min_price, max_price } = response.data;
        setMinPrice(min_price);
        setMaxPrice(max_price);
        setPriceRange([min_price, max_price]); // Set initial price range
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch price range:", error);
        setError("Failed to fetch price range. Please try again later.");
        setLoading(false);
      });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]); // Update local state with selected price range
    fetchFilteredProducts(values[0], values[1]); // Fetch products with the selected price range
  };

  const fetchFilteredProducts = (minPrice: number, maxPrice: number) => {
    setLoading(true);
    axiosInstance
      .get(`/products?min_price=${minPrice}&max_price=${maxPrice}`)
      .then(response => {
        setPriceRange([minPrice, maxPrice]); // Update the price range state with the new values from the backend
        setLoading(false);
        console.log("Filtered products:", response.data);
        // Example: update state or call a callback to update products in the parent component
        onPriceChange([minPrice, maxPrice]);
      })
      .catch(error => {
        console.error("Failed to fetch filtered products:", error);
        setError("Failed to fetch filtered products. Please try again later.");
        setLoading(false);
      });
  };


  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };


  if (minPrice === null || maxPrice === null || priceRange === null) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="filter-by">
      <h2>Filter by</h2>
      <div className="price-filter">
        <h3>Price</h3>
        <Range
          values={priceRange}
          step={1}
          min={minPrice}
          max={maxPrice}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => {
            const { key, ...restProps } = props;
            return (
              <div
                {...restProps}
                key={key}
                style={{
                  ...restProps.style,
                  height: "6px",
                  width: "100%",
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ["#ccc", "var(--primary-color)", "#ccc"],
                    min: 0,
                    max: 100,
                  }),
                }}
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            const { key, ...restProps } = props;
            return (
              <div
                {...restProps}
                key={key}
                style={{
                  ...restProps.style,
                  height: "16px",
                  width: "16px",
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "50%",
                }}
              />
            );
          }}
        />
        <div className="slider-values">
          <span>€{priceRange[0]}</span> <span>€{priceRange[1]}</span>
        </div>
      </div>
      <div className="category-filter">
        <h3>Categories</h3>
        {categories.map((category, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              &nbsp; &nbsp;{category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBy;
