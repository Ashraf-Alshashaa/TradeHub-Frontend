import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ProductCount, TabContentDictionary } from './types';
import ProductListing from '../../components/product-listing/Product-listing';
import { Product } from '../../components/product-listing/types';
import './tab.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoughtProducts, fetchMyBids, fetchMyCart, fetchSoldItems } from '../../features/products/productsSlice';
import { RootState } from '../../app/store';

interface ProductProps {
   id: number;
   name: string;
   image: string;
   price: number;
}

const product: Product = {
  id: 1,
  image: 'https://cdn.pixabay.com/photo/2019/12/29/08/37/women-4726513_640.jpg',
  name: 'Product name',
  price: '$XX.YY',
};

const buyerId = '1';

function ProfileTab() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchMyCart(buyerId));
    dispatch(fetchBoughtProducts(buyerId));
    dispatch(fetchMyBids(buyerId))
    dispatch(fetchSoldItems({buyerId,'1'}))
    dispatch(fetchSoldItems({buyerId, '0'}))
    
  }, [dispatch]);

  const myCartProducts: ProductCount[] = products.map((product: ProductProps) => ({
    id: product.id,
    item: <ProductListing key={product.id} product={product} is_cart={true} />
  }));

  const myBidsProducts: ProductCount[] = products.map((product: ProductProps) => ({
    id: product.id,
    item: <ProductListing key={product.id} product={product} is_cart={false} />
  }));

  const myListingsProducts: ProductCount[] = 
  products.map((product: ProductProps) => ({
    id: product.id,
    item: <ProductListing key={product.id} product={product} is_cart={false} />
  }));

  const boughtItemsProducts: ProductCount[] =
    products.map((product: ProductProps) => ({
      id: product.id,
      item: <ProductListing key={product.id} product={product} is_cart={false} />
    }));

  const soldItemsProducts: ProductCount[] = 
  products.map((product: ProductProps) => ({
    id: product.id,
    item: <ProductListing key={product.id} product={product} is_cart={false} />
  }));

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
      defaultActiveKey="my-cart"
      id="profile-tab"
      className="mb-3"
      fill
    >
      <Tab eventKey="my-cart" title="My Cart">
        {loading ? 'Loading...' : error ? error : tabContent['my-cart']}
      </Tab>
      <Tab eventKey="my-bids" title="My Bids">
      {loading ? 'Loading...' : error ? error : tabContent['my-bids']}
      </Tab>
      <Tab eventKey="my-listings" title="My Listings">
      {loading ? 'Loading...' : error ? error : tabContent['my-listings']}
      </Tab>
      <Tab eventKey="bought-items" title="Bought Items">
        {loading ? 'Loading...' : error ? error : tabContent['bought-items']}
      </Tab>
      <Tab eventKey="sold-items" title="Sold Items">
      {loading ? 'Loading...' : error ? error : tabContent['sold-items']}
      </Tab>
    </Tabs>
  );
}

export default ProfileTab;
