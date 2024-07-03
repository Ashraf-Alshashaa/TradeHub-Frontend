import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/products/productsSlice";
import { AppDispatch, RootState } from "../../app/store";
import CustomImage from "../../components/image/Image";
import ChooseBid from "../../modals/Choose-bid";
import { Form } from "react-bootstrap";
import TextInput from "../../components/text-input/Text-input";
import CustomButton from "../../components/button/Button";
import { sendBidData, fetchAllBids } from "../../features/bids/bidSlice";
import EditProduct from "../../modals/Edit-product";
import "./styles.css";
import { ProductTypes } from "../../modals/types";
import NotificationWS from "../../toasts/NotificationContainer";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)));
      dispatch(fetchAllBids(parseInt(id)));
    }
  }, [dispatch, id]);

  const { product, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const {
    bids,
    loading: bidsLoading,
    error: bidsError,
  } = useSelector((state: RootState) => state.bids);

  const [bidPrice, setBidPrice] = useState<number>();

  const handleBidPriceChange = (value: number) => {
    setBidPrice(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!product || !user || !bidPrice) {
      navigate("/login");
      return;
    }

    const bidData = {
      product_id: product.id as number,
      date: new Date().toISOString(),
      price: bidPrice,
      bidder_id: user.user_id,
      status: "pending" as "pending",
    };

    dispatch(sendBidData(bidData));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorObj: any = error;
    return <div>Error: {errorObj.detail}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const localStorageUser = localStorage.getItem("user");
  const user_id = localStorageUser ? JSON.parse(localStorageUser).user_id : null;

  return (
    <div className="product-page-container">
      <NotificationWS user_id={user_id}/>
      <div className="product-img-container">
        <CustomImage src={product.image} alt={product.name} />
      </div>
      <div className="product-content-container">
        <div className="product-title-container">
          <p className="product-page-product-name">{product.name}</p>
          {product.seller_id === user?.user_id && (
            <div className="product-edit-btn">
              <EditProduct existingData={product as ProductTypes} />
            </div>
          )}
        </div>
        <div className="product-info-container">
          <p className="product-page-product-condition">{product.condition}</p>
          <p>€{product.price}</p>
          <p className="product-page-product-description">
            {product.description}
          </p>
          {product.seller_id === user?.user_id ? (
            <ChooseBid bidsData={bids} />
          ) : (
            <div className="product-add-bid-form">
              <Form className="d-flex mt-3" onSubmit={handleSubmit}>
                <TextInput
                  label=""
                  type="price"
                  onChange={(value) => handleBidPriceChange(value as number)}
                  value={bidPrice as number}
                />
                <div className="submit-bid-btn">
                  <CustomButton
                    className="h-1"
                    text="Add Bid"
                    type="submit"
                    buttonType="primary"
                    onClick={handleSubmit}
                  />
                </div>
              </Form>
              {bidsError && (
                <span className="product-bid-error-msg">
                  {bidsError?.detail}
                </span>
              )}
            </div>
          )}
          {bidsLoading ? (
            <div>Loading...</div>
          ) : bids.length === 0 ? (
            <div className="empty-bids-msg">
              There are no bids for this product yet
            </div>
          ) : (
            <table className="product-page-bids-container">
              <tbody className="product-page-bid-container">
                {bids.map((bid) => (
                  <tr key={"bid-" + bid.id}>
                    <td>
                      <span className="product-page-bidder-name">
                        {bid.username}
                      </span>
                    </td>
                    <td>
                      <span className="product-page-bid-price">
                        €{bid.price}
                      </span>
                    </td>
                    <td>
                      <span className="product-page-bid-date">
                        {new Date(bid.date).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
