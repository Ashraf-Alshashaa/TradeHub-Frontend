
import { FC, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './filter-by.css';
import { FilterByProps } from './types';


const FilterBy: FC<FilterByProps> = ({ onPriceChange, categories }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    onPriceChange([values[0], values[1]]);
  };

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
              step={1}
              min={0}
              max={100}
              onChange={handlePriceChange}
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
                      min: 0,
                      max: 100
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
            <span>€{priceRange[0]}</span>  <span>€{priceRange[1]}</span>
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
