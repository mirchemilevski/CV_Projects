import React from "react";
import minus_sign from "../assets/images/minus.png";
import plus_sign from "../assets/images/plus.png";

const SelectedProduct = (props) => {
    return (
        <div className="selected-product">
            <span style={{ float: "left" }}>{props.product.name}</span>
            <span style={{ float: "right" }}>
                <img
                    src={minus_sign}
                    onClick={() => props.onMinusClick(props.product)}
                />
                <span>{props.product.amount}</span>
                <img
                    src={plus_sign}
                    onClick={() => props.onPlusClick(props.product)}
                />
            </span>
        </div>
    );
};
export default SelectedProduct;
