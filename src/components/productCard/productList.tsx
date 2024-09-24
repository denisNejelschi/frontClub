import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    title: "English",
    description: "Для тех людей, кто всегда мечтал, однако не имел такой возможности...",
    image: "https://elitestudent.ru/wp-content/uploads/2023/06/self-study.png",
    price: 0,
  },
  {
    title: "English",
    description: "Для тех людей, кто всегда мечтал, однако не имел такой возможности...",
    image: "https://elitestudent.ru/wp-content/uploads/2023/06/self-study.png",
    price: 0,
  },
  {
    title: "English",
    description: "Для тех людей, кто всегда мечтал, однако не имел такой возможности...",
    image: "https://elitestudent.ru/wp-content/uploads/2023/06/self-study.png",
    price: 0,
  },
  {
    title: "English",
    description: "Для тех людей, кто всегда мечтал, однако не имел такой возможности...",
    image: "https://elitestudent.ru/wp-content/uploads/2023/06/self-study.png",
    price: 0,
  }
];

const ProductList: React.FC = () => {
  const handleMoreDetails = (title: string) => {
    alert(`More details about ${title}`);
  };

  return (
    <div className="product_Card_Container">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          title={product.title}
          description={product.description}
          image={product.image}
          price={product.price}
          onMoreDetails={() => handleMoreDetails(product.title)}
        />
      ))}
    </div>
  );
};

export default ProductList;
