import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchProductsCount } from "../redux/ProductsSlice";
import { MoveLeft, MoveRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const [pageNo, setPageNo] = useState(1);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  let productsState = useSelector((state) => state.products);
  const { isLoading, error, pageSize, products, count } = productsState;

  let totalPages = count / pageSize;

  useEffect(() => {
    console.log("Inside Effect");

    dispatch(fetchProductsCount({ filters }));
  }, [dispatch, filters]);

  useEffect(() => {
    const from = (pageNo - 1) * pageSize;
    const to = from + pageSize - 1;
    dispatch(fetchProducts({ filters, from, to }));
  }, [dispatch, pageNo]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-screen max-w-7xl m-auto mt-10">
      <NavBar />
      <SearchBox />
      <h1 className="text-2xl font-bold mt-5">Search Results</h1>
      {error && <h1>{error}</h1>}
      <div className="mt-5 flex flex-wrap w-full">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <div className="flex justify-center items-center">
        <button
          className={`border px-4 py-1 rounded-md flex justify-center items-center font-bold m-4 ${
            pageNo == 1 ? "opacity-50 cursor-not-allowed " : ""
          }`}
          disabled={pageNo == 1 ? true : false}
          onClick={(e) => setPageNo((prev) => prev - 1)}
        >
          <MoveLeft className="mr-3" />
          Prev
        </button>
        <button
          className={`border px-4 py-1 rounded-md flex justify-center items-center font-bold ${
            pageNo == totalPages ? "opacity-50 cursor-not-allowed " : ""
          }`}
          disabled={pageNo == totalPages ? true : false}
          onClick={(e) => setPageNo((prev) => prev + 1)}
        >
          Next
          <MoveRight className="ml-3" />
        </button>
      </div>
    </div>
  );
};

export default Products;
