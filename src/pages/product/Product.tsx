import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/products/productsSlice";
import { AppDispatch, RootState } from "../../app/store";
import CustomImage from "../../components/image/Image";
import { Form } from "react-bootstrap";
import TextInput from "../../components/text-input/Text-input";
import CustomButton from "../../components/button/Button";
import { sendBidData, fetchAllBids } from "../../features/bids/bidSlice";
import "./styles.css";

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

  const [bidPrice, setBidPrice] = useState<string>("");

  const handleBidPriceChange = (value: string) => {
    setBidPrice(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!product || !user || !bidPrice) {
      console.error("Incomplete bid data");
      return;
    }

    const bidData = {
      product_id: product.id,
      date: new Date().toISOString(),
      price: parseFloat(bidPrice),
      bidder_id: user.user_id,
      status: "pending" as "pending",
    };

    dispatch(sendBidData(bidData));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || bidsError) {
    return <div>Error: {error || bidsError}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="product-page-container">
      <div className="product-img-container">
        <CustomImage src={product.image} alt={product.name} />
      </div>
      <div className="product-content-container">
        <div className="product-title-container">
          <p className="product-page-product-name">{product.name}</p>
          {product.seller_id === user?.user_id && (
            <div className="product-edit-btn">
              <CustomButton
                text="Edit"
                buttonType="secondary"
                onClick={() => alert("Edit btn clicked")}
              />
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
            <CustomButton
              text="Choose bidder"
              buttonType="primary"
              onClick={() => alert("Choose bidder clicked")}
            />
          ) : (
            <div className="product-add-bid-form">
              <Form className="d-flex mt-3" onSubmit={handleSubmit}>
                <TextInput
                  label=""
                  onChange={(value) => handleBidPriceChange(value)}
                  value={bidPrice}
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
            </div>
          )}
          {bidsLoading ? (
            <div>Loading...</div>
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
