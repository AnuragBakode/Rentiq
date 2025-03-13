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
      <h2 className="text-xl font-semibold mb-4 mt-6">Your Products</h2>
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/5">
          <div className="w-full flex-col max-h-[50vh] overflow-y-scroll lg:max-h-[100vh]">
            {products.length > 0 ? (
              products.map((product) => {
                return (
                  <div
                    className="w-full  mb-2"
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    <Card
                      item={product}
                      page="Products"
                      className="shadow-sm hover:shadow-md"
                      status={product.status}
                      info={{
                        location: product.location,
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-xl font-medium text-grey_dark/50 text-center">
                  You haven't posted any products yet
                </p>
              </div>
            )}
          </div>
        </div>

        {selectedProduct && (
          <div className="w-full md:w-2/5 md:pl-5 mb-10">
            {updateProductModal ? (
              <>
                <div className="bg-white relative">
                  <button
                    onClick={() => setUpdateProductModal(false)}
                    className="absolute top-2 right-2 text-black hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Edit Product
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={selectedProduct.name}
                        onChange={handleOnChangeUpdateInputField}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose/20 focus:border-rose transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={selectedProduct.price}
                        onChange={handleOnChangeUpdateInputField}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose/20 focus:border-rose transition-colors"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={selectedProduct.description}
                        onChange={handleOnChangeUpdateInputField}
                        rows="3"
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose/20 focus:border-rose transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={selectedProduct.category}
                        onChange={handleOnChangeUpdateInputField}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose/20 focus:border-rose transition-colors"
                      >
                        {category.map((cat) => (
                          <option value={cat.type} key={cat.id}>
                            {cat.type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={selectedProduct.location}
                        onChange={handleOnChangeUpdateInputField}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose/20 focus:border-rose transition-colors"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <div className="flex space-x-6">
                        <label className="inline-flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="status"
                            value="Available"
                            checked={selectedProduct.status === "Available"}
                            onChange={handleOnChangeUpdateInputField}
                            className="hidden"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-rose transition-colors">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                selectedProduct.status === "Available"
                                  ? "bg-rose"
                                  : "bg-transparent"
                              }`}
                            ></div>
                          </div>
                          <span className="ml-2 text-gray-700 group-hover:text-rose transition-colors">
                            Available
                          </span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="status"
                            value="Blocked"
                            checked={selectedProduct.status === "Blocked"}
                            onChange={handleOnChangeUpdateInputField}
                            className="hidden"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-rose transition-colors">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                selectedProduct.status === "Blocked"
                                  ? "bg-rose"
                                  : "bg-transparent"
                              }`}
                            ></div>
                          </div>
                          <span className="ml-2 text-gray-700 group-hover:text-rose transition-colors">
                            Blocked
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Picture
                      </label>
                      <div className="border border-dashed border-gray-200 rounded-lg p-3 text-center">
                        <img
                          src={
                            updatedPicture
                              ? URL.createObjectURL(updatedPicture)
                              : selectedProduct.picture
                          }
                          alt=""
                          className="h-32 w-full object-contain mb-2"
                        />
                        <input
                          name="picture"
                          type="file"
                          accept="image/*"
                          onChange={handleOnChangeUpdateInputField}
                          className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-rose/10 file:text-rose hover:file:bg-rose/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-rose text-white font-medium rounded-lg hover:bg-rose/90 transition-colors"
                      onClick={handleSaveProductBtn}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-50 rounded p-3">
                  <div className="h-48 w-full mb-3">
                    <img
                      src={selectedProduct.picture}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {selectedProduct.name}
                      </h2>
                      <span className="px-2 py-0.5 bg-rose/10 text-rose rounded-full text-sm">
                        {selectedProduct.category}
                      </span>
                    </div>

                    <div className="flex items-start text-gray-600">
                      <MapPin size={16} strokeWidth={2} className="mt-1" />
                      <p className="pl-2 text-sm">{selectedProduct.location}</p>
                    </div>

                    <div className="bg-white p-2 rounded text-sm">
                      <span className="font-semibold">Description</span> -{" "}
                      <span className="text-gray-600">
                        {selectedProduct.description}
                      </span>
                    </div>

                    <button
                      className="w-full bg-grey_dark text-white py-1.5 text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                      onClick={openUpdateProduct}
                    >
                      Update Product
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileProductSection;
