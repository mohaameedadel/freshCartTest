import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products.length > 0 ? (
        <div className="products">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="product duration-500 cursor-pointer flex flex-col justify-between"
              >
                <Link to={`details/${product.id}`} >
                <div>
                  <img
                    src={product.imageCover}
                    className="w-full block"
                    alt={product.title}
                  />
                </div>
                <div className="p-2">
                  <h2 className="text-green-600">{product.category.name}</h2>
                  <p className="text-sm text-gray-500">
                    {product.description.split(" ").slice(0, 3).join(" ")}
                  </p>
                  <div className="rating flex justify-between items-center my-2 ">
                    <span>{product.price}EGP</span>
                    <span>
                      <i className="fa-solid fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
                </Link>
                  <div className="p-2 pt-0"><button className="bg-green-500 w-full p-2 rounded text-white btn">Add to cart</button></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </>
  );
}
