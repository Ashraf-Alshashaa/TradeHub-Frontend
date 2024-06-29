import { FC, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import "./filter-by.css";
import { FilterByProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchPriceRange } from "../../features/pricerange/priceRangeSlice";
import RadioButton from "../radio-button/Radio-button";

const FilterBy: FC<FilterByProps> = ({
  categories,
  priceRange = [1, 1000000],
  onPriceChange,
  onCategoryChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { min_price, max_price } = useSelector(
    (state: RootState) => state.pricerange
  );

  useEffect(() => {
    dispatch(fetchPriceRange());
  }, [dispatch]);

  const handleCategoryChange = (category_id: number) => {
    onCategoryChange(category_id);
  };

  return (
    <div className="filter-by">
      <h4>Filter by</h4>
      <div className="price-filter p-3">
        <h5 className="mb-2">Price</h5>
        <div className="price-slider">
          <Range
            values={priceRange}
            step={50}
            min={min_price}
            max={max_price}
            onChange={onPriceChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ["#ccc", "var(--primary-color)", "#ccc"],
                    min: min_price,
                    max: max_price,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "16px",
                  width: "16px",
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "50%",
                }}
              />
            )}
          />
          <div className="slider-values">
            <span>€{priceRange[0]}</span> <span>€{priceRange[1]}</span>
          </div>
        </div>
      </div>
      <div className="category-filter">
        <h5 className="mb-2">Categories</h5>
        {categories.map((category) => (
          <RadioButton
            bidder_name={category.name}
            group_name="Categories"
            bid=""
            onClick={() => handleCategoryChange(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterBy;
