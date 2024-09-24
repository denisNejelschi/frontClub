import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";

interface ProductCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> =
    ({id,
    title,
    description,
    image,
    price,
    }) => {
    return (
        <div key={id} className={styles.productCard}>
            <img src={image} alt={title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productDescription}>{description}</p>
            <p className={styles.productPrice}>${price.toFixed(2)}</p>
            <Link to={String(id)}><Button name='More details'></Button></Link>
        </div>
    );
};

export default ProductCard;