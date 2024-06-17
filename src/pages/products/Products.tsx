import { FC } from 'react';
import FilterBy from '../../components/filter-by/Filter-by';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../components/footer/Footer';
import ProductCard from '../../components/product-card/Product-card'
import './products.css'

const Test: FC = () => {


  const handlePriceChange = (value: [number, number]) => {
    console.log('Price range changed:', value);
  };

  const categories = ['Electronics', 'Furniture', 'Toys', 'Clothes'];

  return (
    <div className='Products'>
      <h1>Test Page</h1>
      <div className='row'>    
      <div className='col-sm-3'>
        <FilterBy onPriceChange={handlePriceChange} categories={categories} />
      </div>

        <div className='col-sm-9 overflow-auto scrollable-products'>
          <div className='row mb-5'>
            <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          </div>
          <div className='row mb-5'>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          </div>
          <div className='row mb-5'>
            <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          </div>
          <div className='row mb-5'>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          <div className='col-sm-4 px-5'>
          <ProductCard
            photo="https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp"
            name="Hair Oil"
            price={11.4}
            location="Nijmegen"
          />
          </div>
          </div>

      </div> 
      </div>
        <Footer githubUrl="https://github.com/yourprofile" email="your.email@example.com" />
    </div>
  );
};

export default Test;
