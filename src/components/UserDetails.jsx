import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import supabase from "../supabase/auth";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import ProductModal from "./ProductModal";
import ProductInfo from "./ProductInfo";
import { MoveRight, MoveLeft, Package } from "lucide-react";
import ProfileUserDetails from "./ProfileUserDetails";
import { useLocation } from "react-router";

const UserDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const location = useLocation();
  const { user } = location.state || {};

  const { isOpen } = useSelector((state) => state.productModal);

  useEffect(() => {
    const fetchProductsCount = async () => {
      const { data } = await supabase
        .from("Products")
        .select()
        .eq("user_id", id);
      setTotalProducts(data.length);
    };

    fetchProductsCount();
  }, []);

  useEffect(() => {
    const pages = Math.ceil(totalProducts / pageSize);
    setTotalPages(pages);
  }, [totalProducts]);

  useEffect(() => {
    setLoading(true);

    const from = (pageNo - 1) * pageSize;
    const to = from + pageSize - 1;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("Products")
        .select()
        .range(from, to)
        .eq("user_id", id);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [pageNo]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="flex w-full mx-auto mt-10">
        <div className="w-1/6">
          <ProfileUserDetails user={user} />
        </div>
        <div className="w-5/6 ml-10">
          <div className="flex">
            <button
              className="mr-10 text-sm font-medium flex items-center gap-2 relative after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-rose after:transition-all after:duration-300 after:w-full"
              onClick={() => {
                setActiveTab("products");
                dispatch(setSelectedOrder(null));
                dispatch(updateSelectedProduct(null));
              }}
            >
              <Package size={18} /> Products
            </button>
          </div>
          {products && Array.isArray(products) && products.length > 0 ? (
            <>
              <div className="mt-5 w-full flex flex-wrap">
                {products.map((product) => {
                  return (
                    <div className="w-1/5" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center items-center">
                <button
                  className={` px-4 py-1 rounded-md flex justify-center items-center font-bold m-4 ${
                    pageNo == 1 ? "opacity-50 cursor-not-allowed " : ""
                  }`}
                  disabled={pageNo == 1 ? true : false}
                  onClick={() => setPageNo((prev) => prev - 1)}
                >
                  <MoveLeft className="mr-3" />
                  Prev
                </button>
                <button
                  className={`px-4 py-1 rounded-md flex justify-center items-center font-bold ${
                    pageNo >= totalPages ? "opacity-50 cursor-not-allowed " : ""
                  }`}
                  disabled={pageNo >= totalPages ? true : false}
                  onClick={() => setPageNo((prev) => prev + 1)}
                >
                  Next
                  <MoveRight className="ml-3" />
                </button>
              </div>
            </>
          ) : (
            <h1 className="text-4xl font-bold text-center w-full">
              User don't have any products
            </h1>
          )}
        </div>

        {isOpen && <ProductModal children={<ProductInfo />} />}
      </div>
    );
  }
};

export default UserDetails;
