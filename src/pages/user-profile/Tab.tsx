import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductListing from '../../components/product-listing/Product-listing';
import './tab.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoughtProducts, fetchMyBids, fetchMyCart, fetchSoldProducts } from '../../features/products/productsSlice';
import { RootState } from '../../app/store';


function ProfileTab() {
  const dispatch = useDispatch();
  const { myCart, myBids, boughtProducts, soldProducts, myListings,loading, error } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);
  

  useEffect(() => {
    dispatch(fetchBoughtProducts(user.user_id));
    dispatch(fetchMyBids(user.user_id))
    dispatch(fetchSoldProducts({seller_id: user.user_id, sold: 'true'}))
    dispatch(fetchSoldProducts({seller_id: user.user_id, sold: 'false'}))
    
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
      defaultActiveKey="my-bids"
      id="profile-tab"
      className="mb-3"
      fill
    >
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
