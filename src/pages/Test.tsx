import { FC } from 'react';
import FilterBy from '../components/filter-by/Filter-by.tsx';

const Test: FC = () => {
  const handlePriceChange = (value: [number, number]) => {
    console.log('Price range changed:', value);
    // Handle filtering logic or pass to other components as needed
  };

  const categories = ['Electronics', 'Furniture', 'Toys', 'Clothes']; 

  return (
    <div className="test-page">
      <h1>Test Page</h1>
      <br></br>
      <FilterBy onPriceChange={handlePriceChange} categories={categories} />
    </div>
  );
};

export default Test;
