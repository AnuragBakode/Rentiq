import React, { useState, useRef } from "react";
import { UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { Camera } from "lucide-react";
import supabase from "../supabase/auth";

const UpdateUserDetailsForm = () => {
  const { session } = useSelector((state) => state.session);
  const metaData = session.user.user_metadata;
  const [previewURL, setPreviewURL] = useState("");
  const [name, setName] = useState(metaData.name);
  const [contactNumber, setContactNumber] = useState(metaData.contact);
  const [email, setEmail] = useState(session.user.email);
  const [file, setFile] = useState("");

  const fileInputRef = useRef();

  console.log(fileInputRef);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleUpdateProfile = async () => {
    console.log(file, name, contactNumber, email);

    // We need to store the image in the supabase storage if any profile picture is selected

    if (file) {
      const fileName = Date.now().toString() + session.user.id;

      const { data } = await supabase.storage
        .from("avatar")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      const { data: publicUrl } = supabase.storage
        .from("avatar")
        .getPublicUrl(fileName);

      console.log(publicUrl);

      const { data: updatedAvatarData, error } = await supabase.auth.updateUser(
        {
          data: { avatar: publicUrl.publicUrl },
        }
      );

      console.log(updatedAvatarData);
    }

    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data: { contact: contactNumber, name: name },
      email: email,
    });

    console.log(updatedUser);
    console.log(error);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-around sm:items-start sm:mt-10">
      <div className="relative overflow-hidden border-2 mb-6 sm:mb-0 w-48 h-48 flex items-center justify-center border-rose rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {previewURL ? (
          <img
            src={previewURL}
            alt="Preview"
            className="min-w-full min-h-full object-top scale-125"
          />
        ) : metaData.avatar ? (
          <img
            src={metaData.avatar}
            alt="Preview"
            className="min-w-full min-h-full object-top scale-125"
          />
        ) : (
          <UserRound size={64} className="text-grey_dark" />
        )}
        <div
          className="absolute inset-0 bg-black bg-opacity-70 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 hover:cursor-pointer transition-opacity duration-300"
          onClick={() => fileInputRef.current.click()}
        >
          <Camera className="text-white" size={48} />
        </div>
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileSelection}
        />
      </div>
      <div className="space-y-6 w-[100%] sm:w-[60%]">
        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-grey_dark mb-2"
          >
            Contact
          </label>
          <div className="relative">
            <input
              id="contact"
              name="contact"
              type="text"
              value={contactNumber}
              className="w-full px-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
              placeholder="Contact Number"
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-grey_dark mb-2"
          >
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              className="w-full pl-4 pr-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-grey_dark mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            className="w-full px-4 py-2.5 rounded-lg border border-grey focus:border-rose focus:ring-1 focus:ring-rose/20 transition-colors duration-200 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="border-grey">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-rose text-white font-medium rounded-lg hover:bg-rose/90 transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={handleUpdateProfile}
          >
            <span>Update</span>
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
      </div>
    </div>
  );
};

export default UpdateUserDetailsForm;
