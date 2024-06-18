import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ProductCount, TabContentDictionary } from './types';
import ProductListing from '../../components/product-listing/Product-listing';
import { Product } from '../../components/product-listing/types';

const product: Product = {
    id: 1,
    image: 'https://cdn.pixabay.com/photo/2019/12/29/08/37/women-4726513_640.jpg',
    name: 'Product name',
    price: '$XX.YY',
  };

//   function fillProductsList(products: Product[]): ProductCount[] {
//     return products.map(product => ({
//         id: product.id,
//         item: <ProductListing product={product}/>}))
// }

function ProfileTab() {
    const myCartProducts: ProductCount[] = [
        { id: 1, item: <ProductListing product={product} /> },
        { id: 2, item: <ProductListing product={product} /> },
      ];
    
      const myBidsProducts: ProductCount[] = [];
    
      const myListingsProducts: ProductCount[] = [
        { id: 3, item: <ProductListing product={product} /> },
      ];
    
      const boughtItemsProducts: ProductCount[] = [
        { id: 4, item: <ProductListing product={product} /> },
        { id: 5, item: <ProductListing product={product} /> },
      ];
    
      const soldItemsProducts: ProductCount[] = [
        { id: 6, item: <ProductListing product={product} /> },
      ];
    
      // Map each tab to its content
      const tabContent: TabContentDictionary = {
        'my-cart': myCartProducts.length > 0 ? myCartProducts.map(product => product.item) : 'No content',
        'my-bids': myBidsProducts.length > 0 ? myBidsProducts.map(product => product.item) : 'No content',
        'my-listings': myListingsProducts.length > 0 ? myListingsProducts.map(product => product.item) : 'No content',
        'bought-items': boughtItemsProducts.length > 0 ? boughtItemsProducts.map(product => product.item) : 'No content',
        'sold-items': soldItemsProducts.length > 0 ? soldItemsProducts.map(product => product.item) : 'No content',
      };
  return (
    <Tabs
      defaultActiveKey="profile"
      id="profile-tab"
      className="mb-3"
      fill
    >
      <Tab eventKey="my-cart" title="My Cart">
      {tabContent['my-cart']}
      </Tab>
      <Tab eventKey="my-bids" title="My Bids">
      {tabContent['my-bids']}
      </Tab>
      <Tab eventKey="my-listnigs" title="My Listings">
      {tabContent['my-listings']}
      </Tab>
      <Tab eventKey="boght-items" title="Bought Items">
      {tabContent['bought-items']}
      </Tab>
      <Tab eventKey="sold-items" title="Sold Items">
      {tabContent['sold-items']}
      </Tab>
    </Tabs>
  );
}

export default ProfileTab;