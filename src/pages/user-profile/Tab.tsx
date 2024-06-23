import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ProductCount, TabContentDictionary } from './types';
import ProductListing from '../../components/product-listing/Product-listing';
import { Product } from '../../components/product-listing/types';
import './tab.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoughtProducts, fetchMyBids, fetchMyCart, fetchSoldProducts } from '../../features/products/productsSlice';
import { RootState } from '../../app/store';


const buyerId = '1';

function ProfileTab() {
  const dispatch = useDispatch();
  const { myCart, myBids, boughtProducts, soldProducts, myListings,loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchMyCart(buyerId));
    dispatch(fetchBoughtProducts(buyerId));
    dispatch(fetchMyBids(buyerId))
    dispatch(fetchSoldProducts({sellerId: buyerId, flag: '1'}))
    dispatch(fetchSoldProducts({sellerId: buyerId, flag: '0'}))
    
  }, [dispatch]);


  const renderProducts = (products, isCart = false) => {
    if (products.length > 0) {
      return products.map(product => (
        <ProductListing key={product.id} product={product} is_cart={isCart} />
      ));
    }
    return 'No content';
  };

  return (
    <Tabs
      defaultActiveKey="my-cart"
      id="profile-tab"
      className="mb-3"
      fill
    >
      <Tab eventKey="my-cart" title="My Cart">
        {loading ? 'Loading...' : error ? error : renderProducts(myCart, true)}
      </Tab>
      <Tab eventKey="my-bids" title="My Bids">
      {loading ? 'Loading...' : error ? error : renderProducts(myBids)}
      </Tab>
      <Tab eventKey="my-listings" title="My Listings">
      {loading ? 'Loading...' : error ? error : renderProducts(myListings)}
      </Tab>
      <Tab eventKey="bought-items" title="Bought Items">
        {loading ? 'Loading...' : error ? error : renderProducts(boughtProducts)}
      </Tab>
      <Tab eventKey="sold-items" title="Sold Items">
      {loading ? 'Loading...' : error ? error : renderProducts(soldProducts)}
      </Tab>
    </Tabs>
  );
}

export default ProfileTab;
