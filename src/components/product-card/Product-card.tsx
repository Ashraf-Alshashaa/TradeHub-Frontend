import React from "react";
import "./product-card.css";
import { ProductCardProps } from "./types";
import { CardImg, CardTitle, ListGroup, Card } from "react-bootstrap";

const ProductCard: React.FC<ProductCardProps> = ({
  photo,
  name,
  price,
  location,
}) => {
  const CardClick = () => {
    console.log("Card clicked!");
  };
  return (
    <div onClick={CardClick}>
      <Card>
      <div className="product-card-image-container">
        <CardImg variant="top" src={photo} className="product-image" />
      </div>
        <Card.Body>
          <CardTitle> {name} </CardTitle>
          <ListGroup.Item className="text-success font-weight-bold">
            €{price}
          </ListGroup.Item>
          <ListGroup.Item>{location}</ListGroup.Item>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
