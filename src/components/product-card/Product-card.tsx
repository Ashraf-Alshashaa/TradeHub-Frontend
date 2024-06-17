import React from "react";
import "./product-card.css";
import { ProductCardProps } from "./types";
import Card from "react-bootstrap/Card";
import { CardImg, CardTitle } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

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
        <CardImg variant="top" src={photo} />
        <Card.Body>
          <CardTitle> {name} </CardTitle>
          <ListGroup.Item className="text-success font-weight-bold">
            {price}€
          </ListGroup.Item>
          <ListGroup.Item>{location}</ListGroup.Item>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
