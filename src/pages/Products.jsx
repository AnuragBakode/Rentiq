import React, { useEffect, useMemo, useRef } from "react";
import SearchBox from "../components/SearchBox";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchProductsCount } from "../redux/ProductsSlice";
import { MoveLeft, MoveRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import ProductModal from "../components/ProductModal";
import ProductInfo from "../components/ProductInfo";
import Header from "../components/Header";

const Products = () => {
  const pageNoRef = useRef(1);
  const [urlSearchParam] = useSearchParams();

  let productsState = useSelector((state) => state.products);
  const { isLoading, error, pageSize, products, count } = productsState;

  let totalPages = Math.ceil(count / pageSize);

  const dispatch = useDispatch();

  const filters = useMemo(() => {
    const newFilters = {};
    for (let key of urlSearchParam.keys()) {
      newFilters[key] = urlSearchParam.get(key);
    }
    return newFilters;
  }, [urlSearchParam]);

  useEffect(() => {
    pageNoRef.current = 1;
    dispatch(fetchProductsCount({ filters }));
    const from = (pageNoRef.current - 1) * pageSize;
    const to = from + pageSize - 1;
    dispatch(fetchProducts({ filters, from, to }));
  }, [filters]);

  const handlePageChange = (pageNo) => {
    if (pageNo < 1 || pageNo > totalPages) return;
    pageNoRef.current = pageNo;
    const from = (pageNoRef.current - 1) * pageSize;
    const to = from + pageSize - 1;
    dispatch(fetchProducts({ filters, from, to }));
  };

  const { isOpen } = useSelector((state) => state.productModal);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className=" w-11/12 m-auto">
        <div className="sticky top-0 pt-6 z-10 bg-white">
          <NavBar />
        </div>
        <div className="mt-10 m-auto">
          <Header showCards={false} />
        </div>
        <h1 className="text-2xl font-bold mt-5">Searched Results</h1>
        {error && <h1>{error}</h1>}
        {products.length ? (
          <>
            <div className="mt-5 w-full flex flex-wrap">
              {products.map((product) => {
                return (
                  <div className="w-1/2 md:w-1/3 lg:w-1/4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center">
              <button
                className={` px-4 py-1 rounded-md flex justify-center items-center font-bold m-4 ${
                  pageNoRef.current == 1 ? "opacity-50 cursor-not-allowed " : ""
                }`}
                disabled={pageNoRef.current == 1 ? true : false}
                onClick={() => handlePageChange(pageNoRef.current - 1)}
              >
                <MoveLeft className="mr-3" />
                Prev
              </button>
              <button
                className={`px-4 py-1 rounded-md flex justify-center items-center font-bold ${
                  pageNoRef.current >= totalPages
                    ? "opacity-50 cursor-not-allowed "
                    : ""
                }`}
                disabled={pageNoRef.current >= totalPages ? true : false}
                onClick={() => handlePageChange(pageNoRef.current + 1)}
              >
                Next
                <MoveRight className="ml-3" />
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-center text-3xl sm:text-4xl mt-20 font-bold">
            No products found!
          </h1>
        )}
        {isOpen && <ProductModal children={<ProductInfo />} />}
      </div>
    );
  }
};

export default Products;
