import React, { useEffect, useState } from "react";
import supabase from "../supabase/auth";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const PostItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    description: null,
    category: null,
    picture: null,
    price: null,
    location: null,
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const category = useSelector((state) => {
    return state.productCategory;
  });

  const { session } = useSelector((state) => state.session);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearData = () => {
    setIsOpen(false);
    setLoading(false);
    setError("");

    for (let key of Object.keys(formData)) {
      setFormData((prevData) => {
        return { ...prevData, [key]: null };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Take the photo and store it in the supabase storage
    const { picture } = formData;

    // Picture check is required because picture is going to the storage first
    if (!picture) {
      setError("Please select a picture");
      setLoading(false);
      return;
    }

      const fileName = Date.now().toString() + session.user.id;

      const { data } = await supabase.storage
        .from("Product Images")
        .upload(fileName, picture, { cacheControl: "3600", upsert: false });

      // Get the public URL of the  image and then save that URL in the database with the product details

      const { data: publicUrl } = supabase.storage
        .from("Product Images")
        .getPublicUrl(fileName);

    const { error } = await supabase.from("Products").insert({
      ...formData,
      user_id: session.user.id,
      picture: publicUrl.publicUrl,
    });

    // IF we  get an error while saving the data to the  data base we might not want to save the data in the supabase storage as well
    if (error) {
      supabase.storage.from("Product Images").remove([fileName]);
      console.log(error);

      setError("Please enter all the details");
      setLoading(false);
      return;
    }

    clearData();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-grey_dark text-white font-semibold px-4 py-2 rounded-lg text-xs hover:bg-grey_dark/90 transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Post Item
      </button>

      {isLoading && <Loader />}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div
            className="fixed inset-0 bg-grey_dark/60 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              setError("");
            }}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="p-8 border-b border-grey sticky top-0 bg-white z-10 rounded-t-xl">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                }}
                className="absolute top-6 right-6 p-2 hover:bg-grey rounded-full transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-grey_dark"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <img
                  alt="Rentiq"
                  src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
                  className="h-8 w-auto"
                />
                <div className="h-6 w-px bg-grey"></div>
                <h2 className="text-2xl font-bold text-grey_dark">
                  Post an Item
                </h2>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              {error && (
                <div className="mb-6 p-4 bg-rose/10 rounded-lg border border-rose/20">
                  <p className="text-rose text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-grey_dark mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
                        placeholder="Enter item name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-grey_dark mb-2"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
                        placeholder="Describe your item"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-grey_dark mb-2"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
                      >
                        <option value="">Select a category</option>
                        {category.map((cat) => (
                          <option key={cat.id} value={cat.type}>
                            {cat.type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="picture"
                        className="block text-sm font-medium text-grey_dark mb-2"
                      >
                        Picture
                      </label>
                      <div className="relative">
                        <input
                          id="picture"
                          name="picture"
                          type="file"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              picture: e.target.files[0],
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-grey_dark mb-2"
                      >
                        Price per day
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-grey_dark">
                          ₹
                        </span>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-grey_dark mb-2"
                      >
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-grey">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-rose text-white font-medium rounded-lg hover:bg-rose/90 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Post Item</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
