import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import {
  updateSelectedProduct,
  updateSelectedProductField,
  updateUserProduct,
} from "../redux/UserProductsSlice";
import { MapPin, MoveLeft, MoveRight } from "lucide-react";
import supabase from "../supabase/auth";
import Loader from "../components/Loader";
import { fetchUserProducts } from "../redux/UserProductsSlice";

const ProfileProductSection = () => {
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [updatedPicture, setUpdatedPicture] = useState("");

  const { session } = useSelector((state) => state.session);
  const user = session.user;

  const dispatch = useDispatch();

  const { products, isLoading, error, selectedProduct } = useSelector(
    (state) => state.userProducts
  );

  const category = useSelector((state) => state.productCategory);

  const handleProductClick = (product) => {
    dispatch(updateSelectedProduct(product));
    setUpdateProductModal(false);
    setUpdatedPicture("");
  };

  const openUpdateProduct = () => {
    setUpdateProductModal(true);
  };

  const handleOnChangeUpdateInputField = (e) => {
    const { name, value } = e.target;
    if (name == "picture") {
      const value = e.target.files[0];
      setUpdatedPicture(value);
      return;
    }
    dispatch(updateSelectedProductField({ field: name, value }));
  };

  const handleSaveProductBtn = async () => {
    if (updatedPicture) {
      const fileName = Date.now().toString();

      const { data } = await supabase.storage
        .from("Product Images")
        .upload(fileName, updatedPicture, {
          cacheControl: "3600",
          upsert: false,
        });

      const { data: publicUrl } = supabase.storage
        .from("Product Images")
        .getPublicUrl(fileName);

      dispatch(
        updateUserProduct({ ...selectedProduct, picture: publicUrl.publicUrl })
      );

      setUpdateProductModal(false);
    } else {
      dispatch(updateUserProduct(selectedProduct));
      setUpdateProductModal(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <h2 className="text-xl font-semibold mb-4">Your Products</h2>
      <div className="flex items-start">
        <div className="flex flex-col w-3/5 pr-5">
          <div className="w-full flex flex-wrap">
            {products.map((product) => {
              return (
                <div
                  className="w-1/3 p-2"
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                >
                  <Card item={product} />
                </div>
              );
            })}
          </div>
        </div>

        {selectedProduct && (
          <div className="w-2/5 pl-5 mb-10">
            {updateProductModal ? (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleOnChangeUpdateInputField}
                    className="w-full p-2 border rounded mt-1"
                  />

                  <label className="block text-sm font-medium mt-3">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleOnChangeUpdateInputField}
                    className="w-full p-2 border rounded mt-1"
                  />

                  <label className="block text-sm font-medium mt-3">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleOnChangeUpdateInputField}
                    className="w-full p-2 border rounded mt-1"
                  />

                  <label className="block text-sm font-medium mt-3">
                    Category
                  </label>
                  <select
                    name="category"
                    value={selectedProduct.category}
                    onChange={handleOnChangeUpdateInputField}
                    className="w-full p-2 border rounded mt-1"
                  >
                    {category.map((cat) => {
                      return (
                        <option value={cat.type} key={cat.id}>
                          {cat.type}
                        </option>
                      );
                    })}
                  </select>

                  <label className="block text-sm font-medium mt-3">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={selectedProduct.location}
                    onChange={handleOnChangeUpdateInputField}
                    className="w-full p-2 border rounded mt-1"
                  />

                  <label className="block text-sm font-medium mt-3">
                    Picture
                  </label>
                  <img
                    src={
                      updatedPicture
                        ? URL.createObjectURL(updatedPicture)
                        : selectedProduct.picture
                    }
                    alt=""
                    className="p-3 h-48 w-full object-contain"
                  />
                  <input
                    name="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleOnChangeUpdateInputField}
                    className="w-full p-2 border rounded mt-1"
                  />

                  <button
                    type="submit"
                    className="w-full bg-green text-white font-medium text-md p-2 mt-4 rounded hover:bg-blue-600"
                    onClick={handleSaveProductBtn}
                  >
                    Save Product
                  </button>
                </div>
              </>
            ) : (
              <>
                <Card item={selectedProduct} />
                <div className="flex items-center justify-between">
                  <p className="font-semibold mt-1">{selectedProduct.name}</p>
                  <p className="font-bold">{selectedProduct.category}</p>
                </div>
                <div className="flex items-start mt-3 text-green">
                  <MapPin size={18} strokeWidth={2} className="mt-1" />
                  <p className="pl-2">{selectedProduct.location}</p>
                </div>
                <div className="mt-5">
                  <span className="font-bold">Description</span> -{" "}
                  {selectedProduct.description}
                </div>
                <button
                  className="w-full bg-grey pt-2 pb-2 text-sm font-medium rounded-sm mt-3"
                  onClick={openUpdateProduct}
                >
                  Update Product
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileProductSection;
