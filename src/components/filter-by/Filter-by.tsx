import { FC, useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './filter-by.css';
import { FilterByProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchPriceRange } from '../../features/pricerange/priceRangeSlice'; 


const FilterBy: FC<FilterByProps> = ({ categories, priceRange = [109,300], onPriceChange }) => {

  const dispatch = useDispatch<AppDispatch>();

  const { min_price, max_price, loading, error } = useSelector(
    (state: RootState) => state.pricerange
  );

  useEffect(() => {
    dispatch(fetchPriceRange());
  }, [dispatch]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="filter-by">
      <h2>Filter by</h2>
      <div className="price-filter">
        <div className="price-heading">
          <h3>Price</h3>
        </div>
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
                  height: '6px',
                  width: '100%',
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ['#ccc', 'var(--primary-color)', '#ccc'],
                    min: min_price,
                    max: max_price
                  })
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
                  height: '16px',
                  width: '16px',
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '50%'
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
        <h3>Categories</h3>
        {categories.map((category, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              /> &nbsp; &nbsp;
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBy;
