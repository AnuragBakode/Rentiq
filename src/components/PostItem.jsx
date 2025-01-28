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
      .getPublicUrl(fileName, {
        transform: {
          height: 200,
          width: 200,
        },
      });

    const { error } = await supabase.from("Products").insert({
      ...formData,
      user_id: session.user.id,
      picture: publicUrl.publicUrl,
    });

    // IF we  get an error while saving the data to the  data base we might not want to save the data in the supabase storage as well
    if (error) {
      supabase.storage.from("Product Images").remove([fileName]);
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
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white font-semibold px-4 py-2 rounded-lg bg-green"
      >
        Post an Item
      </button>

      {isLoading && <Loader />}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}    
          ></div>

          <div className="relative bg-white rounded-md shadow-xl p-6 w-full max-w-5xl h-[70vh] overflow-y-auto scrollbar-hide">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-black font-bold text-xl"
              aria-label="Close"
            >
              ×
            </button>
            <img
              alt="Your Company"
              src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
              className="h-5 w-auto mb-4"
            />
            <h2 className="text-3xl font-bold mb-1 text-rose">Post an item</h2>
            {error && <p className="mb-1 mt-1 text-rose text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-1/2 border-b text-black border-black focus:outline-none focus:ring-0 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-black"
                >
                  Descripition
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-1/2 text-black border-b border-black focus:outline-none focus:ring-0 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-black"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-4 block w-1/2 text-black border-b border-black focus:outline-none focus:ring-0 focus:border-blue-500"
                >
                  <option>Select a category</option>
                  {category.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.type}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  htmlFor="picture"
                  className="block text-sm font-medium text-black"
                >
                  Picture
                </label>
                <input
                  id="picture"
                  name="picture"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, picture: e.target.files[0] })
                  }
                  className="mt-4 block w-1/2 border-b text-black border-black focus:outline-none focus:ring-0 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-black"
                >
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-1/2 border-b text-black border-black focus:outline-none focus:ring-0 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-black"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-1/2 border-b text-black border-black focus:outline-none focus:ring-0 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-3 bg-rose text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
