import React from "react";

const Product = (props) => {
    return (
        <div
            className={`card ${props.product.selected ? "selected" : ""}`}
            onClick={() => props.onPress(props.product)}
        >
            <img src={`/images/${props.product.img}`} />
            <p>{props.product.name}</p>
            <p>
                {props.product.price} {props.product.text}
            </p>
        </div>
    );
};
export default Product;
