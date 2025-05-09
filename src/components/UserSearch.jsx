import React, { useRef, useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchUsersCount } from "../redux/UsersSlice";
import Loader from "./Loader";
import { Mail, MoveLeft, MoveRight, Phone, User } from "lucide-react";
import { useNavigate } from "react-router";
import { UserRound } from "lucide-react";

const UserSearch = () => {
  const pageNoRef = useRef(1);
  const [urlSearchParam] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("User Search Remounts");
  }, []);

  let usersData = useSelector((state) => state.users);
  const { isLoading, error, pageSize, users, count } = usersData;

  let totalPages = Math.ceil(count / pageSize);

  const dispatch = useDispatch();

  const name = useMemo(() => {
    const newName = urlSearchParam.get("name");
    return newName;
  }, [urlSearchParam]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUsersCount({ name }));
      pageNoRef.current = 1;
      const from = (pageNoRef.current - 1) * pageSize;
      const to = from + pageSize - 1;
      dispatch(fetchUsers({ name, from, to }));
    };

    fetchData();
  }, [name]);

  const handlePageChange = async (pageNo) => {
    if (pageNo < 1 || pageNo > totalPages) return;
    pageNoRef.current = pageNo;
    const from = (pageNoRef.current - 1) * pageSize;
    const to = from + pageSize - 1;
    dispatch(fetchUsers({ name, from, to }));
  };

  const handleUserCardClick = (userId, user) => {
    console.log(user);

    navigate(`/users/${userId}`, { state: { user } });
  };

  return (
    <div className="">
      {isLoading && <Loader />}
      <Header />
      <div className="">
        <h1 className="text-xl lg:text-2xl font-bold mt-10">
          Searched Results
        </h1>
        {error && <p>Error fetching users: {error}</p>}
        {users.length === 0 ? (
          <p className="text-red mt-5">No searched user is present.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 cursor-pointer">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-row items-center p-2 border-grey_dark rounded-md shadow-sm relative bg-white transition duration-200 hover:shadow-md"
                  onClick={() => {
                    console.log(user);
                    handleUserCardClick(user.id, user);
                  }}
                >
                  <div className="w-10 h-10 sm:w-20 sm:h-20 flex items-center justify-center rounded-sm mr-4 overflow-hidden">
                    {user.user_metadata.avatar ? (
                      <img
                        src={user.user_metadata.avatar}
                        alt={`${user.name}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserRound size={64} className="text-rose" />
                    )}
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-800">
                      {user.user_metadata.name}
                    </h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Mail
                        size={16}
                        strokeWidth={2}
                        className="mr-2 text-blue-500"
                      />
                      <p className="flex items-center text-xs sm:text-sm md:text-lg font-medium">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Phone
                        size={16}
                        strokeWidth={2}
                        className="mr-2 text-blue-500"
                      />
                      <p className="flex items-center text-xs sm:text-sm md:text-base font-medium">
                        {user.user_metadata.contact
                          ? user.user_metadata.contact
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <button
                className={`px-4 py-1 rounded-md flex justify-center items-center font-bold m-4 ${
                  pageNoRef.current === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={pageNoRef.current === 1}
                onClick={() => handlePageChange(pageNoRef.current - 1)}
              >
                <MoveLeft className="mr-3" />
                Prev
              </button>
              <button
                className={`px-4 py-1 rounded-md flex justify-center items-center font-bold ${
                  pageNoRef.current >= totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={pageNoRef.current >= totalPages}
                onClick={() => handlePageChange(pageNoRef.current + 1)}
              >
                Next
                <MoveRight className="ml-3" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
