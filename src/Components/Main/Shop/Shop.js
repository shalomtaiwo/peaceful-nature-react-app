import * as React from "react";
import Data from "./Product/Data";
import "./Shop.css";
import Products from "./Product/Product";

const Shop = () => {

  return (
    <div className="Shop">
      <div className="archives">
        {Data.productData.map((item, index) => {
          return (
            <Products
            key={index}
            item={item}
            title={item.title}
            img={item.img}
            name={item.name}
            bundle={item.bundle}
            id={item.slug}
            price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
