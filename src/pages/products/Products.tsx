import { FC } from 'react';
import FilterBy from '../../components/filter-by/Filter-by';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ProductCard from '../../components/product-card/Product-card';
import './products.css';

const Test: FC = () => {
  const handlePriceChange = (value: [number, number]) => {
    console.log('Price range changed:', value);
  };
  const cardClicked = () => alert("Card clicked")
  const categories = ['Electronics', 'Furniture', 'Toys', 'Clothes'];

  // Example product data
  const products = [
    { id: 1, photo: "https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-958x632.webp", name: "Hair Oil", price: 11.4, location: "Nijmegen",},
    { id: 2, photo: "https://cdn.pixabay.com/photo/2022/03/17/04/57/cosmetic-products-7073743_640.jpg", name: "Conditioner", price: 10, location: "Maastricht" },
    { id: 3, photo: "https://cdn.pixabay.com/photo/2018/08/29/14/47/perfume-3640056_640.jpg", name: "Perfume", price: 98.99, location: "Utrecht" },
    { id: 4, photo: "https://cdn.pixabay.com/photo/2020/09/23/20/27/headphones-5596987_640.jpg", name: "Headphones", price: 114, location: "Almere" },
    { id: 5, photo: "https://cdn.pixabay.com/photo/2023/11/10/10/19/cheese-8379082_640.jpg", name: "Grater", price: 14, location: "Eindhoven" },
    { id: 6, photo: "https://cdn.pixabay.com/photo/2020/09/17/06/20/nike-5578104_640.jpg", name: "Sneakers", price: 144, location: "Amsterdam" },
    { id: 7, photo: "https://cdn.pixabay.com/photo/2019/09/03/10/53/watch-4449152_640.jpg", name: "Watch", price: 540, location: "Nijmegen" },
  ];
  
  const chunkArray = (arr: any[], size: number) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  // Chunk products into rows of 3 columns each
  const chunkedProducts = chunkArray(products, 3);

  return (
    <div className='Products'>
      <Header />
      <div className='row'>
        <div className='col-3'>
          <FilterBy onPriceChange={handlePriceChange} categories={categories} />
        </div>

        <div className='col-9 my-4 overflow-auto scrollable-products'>

          {chunkedProducts.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className='row mb-5'>
              {row.map(product => (
                <div key={product.id} className='col-4 mb-4'>
                  <ProductCard
                    photo={product.photo}
                    name={product.name}
                    price={product.price}
                    location={product.location}
                    onClick={cardClicked}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer githubUrl="https://github.com/yourprofile" email="your.email@example.com" />
    </div>
  );
};

export default Test;
