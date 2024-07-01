import { FC, useEffect , useState} from 'react';
import { Range, getTrackBackground } from 'react-range';
import './filter-by.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchPriceRange } from '../../features/pricerange/priceRangeSlice'; 
import RadioButton from '../radio-button/Radio-button';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategories } from '../../features/categories/categorySlice';

const FilterBy: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { min_price, max_price} = useSelector(
    (state: RootState) => state.pricerange
  );
  const { categories } = useSelector(
    (state: RootState) => state.categories
  );
  const navigate = useNavigate()
  const [priceRange, setPriceRange] = useState<[number, number]>([min_price, max_price]);
   // State to manage selectedCategoryId
   const [categoryId, setCategoryId] = useState<number | null>(null);

    // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPriceRange());
  }, [dispatch]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    updateURL(searchQuery, categoryId, values[0], values[1]);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setCategoryId(categoryId);
    const queryParams = new URLSearchParams(location.search);
    if (categoryId !== null) {
      queryParams.set("category", categoryId.toString());
    } else {
      queryParams.delete("category");
    }
    navigate(`/products?${queryParams.toString()}`);
  };

  const updateURL = (search: string, category: number | null, minPrice: number, maxPrice: number) => {
    const queryParams = new URLSearchParams();
    if (search.trim() !== "") {
      queryParams.set("search", search.trim());
    }
    if (category !== null) {
      queryParams.set("category", category.toString());
    }
    queryParams.set("min_price", minPrice.toString());
    queryParams.set("max_price", maxPrice.toString());
    navigate(`/products?${queryParams.toString()}`);
  };

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle URL changes to update local state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search") || "";
    const category = urlParams.get("category") || null;

    setSearchQuery(search);
    setCategoryId(category ? parseInt(category) : null);
    setPriceRange([parseInt(urlParams.get("min_price") || min_price.toString()), parseInt(urlParams.get("max_price") || max_price.toString())]);

  }, [location.search]);



  return (
    <div className="filter-by">
      <h2>Filter by</h2>
      <div className="price-filter p-3 mb-2">
          <h4 className='mb-4'>Price</h4>
        <div className="price-slider mb-2">
          <Range
            values={priceRange}
            step={50}
            min={min_price}
            max={max_price}
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
        <h4 className='mb-3'>Categories</h4>
        <RadioButton
          bidder_name="All Products"
          group_name="Categories"
          bid=""
          onClick={() => handleCategoryChange(null)}
          checked={categoryId === null}

        />
        {categories.map((category) => (
              <RadioButton
              bidder_name={category.name} 
              group_name='Categories'
              bid='' 
              onClick={() => handleCategoryChange(category.id)}
              checked={categoryId === category.id}
          
                />
        ))}
      </div>
    </div>
  );
};

export default FilterBy;
