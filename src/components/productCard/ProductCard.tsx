import React from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    title: string;
    description: string;
    image: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     title,
                                                     description,
                                                     image,
                                                     price,
                                                 }) => {
    return (
        <div className={styles.productCard}>
            <img src={image} alt={title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productDescription}>{description}</p>
            <p className={styles.productPrice}>${price.toFixed(2)}</p>
            {/* для кнопки подробне */}
        </div>
    );
};

export default ProductCard;