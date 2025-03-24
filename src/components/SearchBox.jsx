import React, { useMemo, useState, useCallback } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import supabase from "../supabase/auth";

const SearchBox = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");
  const [userSuggestion, setUserSuggestion] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    if (product) {
      navigate(`/products?name=${product}`);
    } else {
      navigate(`/users?name=${user}`);
    }

    setProduct("");
    setUser("");
  };

  const debounce = useCallback((functionToCall, delay) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        functionToCall(...args);
      }, delay);
    };
  }, []);

  const fetchSuggestions = async (...args) => {
    if (!args[0] || !args[0].length) {
      setSuggestion("");
      return;
    }
    const { data, error } = await supabase
      .from("Products_Name")
      .select()
      .eq("status", "Available");

    if (error) {
      setError(error);
      return;
    }
    const filteredData = data.filter((product) => {
      return product.name.toLowerCase().includes(args[0].toLowerCase());
    });

    if (filteredData.length != 0) {
      setSuggestion({ data: filteredData });
    } else {
      setSuggestion({ message: "No product found with this name" });
    }
  };

  const fetchUserSuggestion = async (...args) => {
    if (!args[0] || !args[0].length) {
      setUserSuggestion("");
      return;
    }
    let { data: users, error } = await supabase.functions.invoke(
      "getAllUsersName",
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(
              localStorage.getItem("sb-dpbexlknorwqhblxxmfl-auth-token")
            ).access_token
          }`,
        },
      }
    );

    if (error) {
      setError(error);
      return;
    }
    users = JSON.parse(users);
    const result = users.filter((user) => {
      if (user.toLowerCase().includes(args[0].toLowerCase())) {
        return user;
      }
    });

    if (result.length != 0) {
      setUserSuggestion({ data: result });
    } else {
      setUserSuggestion({ message: "No users found with this name" });
    }
  };

  const debouncedFetchSuggestions = useMemo(() => {
    return debounce(fetchSuggestions, 300);
  }, []);

  const deboucedFetchUsersSuggestions = useMemo(() => {
    return debounce(fetchUserSuggestion, 300);
  }, []);

  return (
    <div className="max-w-[100vw] sm:max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex flex-row">
          <div className="w-1/2 mr-5">
            <div className="relative w-full sm:w-48 md:w-60 lg:w-72">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 bg-transparent outline-none text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-rose after:scale-x-0 after:transition-transform after:duration-300 focus:after:scale-x-100"
                onChange={(e) => {
                  setProduct(e.target.value);
                  setUser("");
                  debouncedFetchSuggestions(e.target.value);
                }}
                value={product}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestion(""); // Clear suggestion after a delay
                  }, 300); // Adjust the delay as needed
                }}
                onFocus={(e) => debouncedFetchSuggestions(e.target.value)}
              />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-grey_dark"></span>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              {suggestion.data && (
                <div className="max-h-40 overflow-x-scroll w-full bg-grey_dark text-white absolute left-0 top-150 z-50">
                  {suggestion.data.map((s) => {
                    return (
                      <div
                        className="p-2 border-b cursor-pointer text-xs sm:text-sm"
                        key={s.id}
                        onClick={() => {
                          setProduct((prev) => s.name);
                        }}
                      >
                        <p>{s.name}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {suggestion.message && (
                <div className="max-h-40 w-full bg-grey absolute left-0 top-110 z-50 flex justify-center items-center p-2 text-sm text-center">
                  <p>{suggestion.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 ">
            <div className="relative w-full sm:w-48 md:w-60 lg:w-72">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2.5 bg-transparent outline-none text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-rose after:scale-x-0 after:transition-transform after:duration-300 focus:after:scale-x-100"
                onChange={(e) => {
                  setUser(e.target.value);
                  setProduct("");
                  deboucedFetchUsersSuggestions(e.target.value);
                }}
                value={user}
                onBlur={() => {
                  setTimeout(() => {
                    setUserSuggestion(""); // Clear suggestion after a delay
                  }, 300); // Adjust the delay as needed
                }}
                onFocus={(e) => deboucedFetchUsersSuggestions(e.target.value)}
              />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-grey_dark"></span>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              {userSuggestion.data && (
                <div className="max-h-40 overflow-x-scroll w-full bg-grey_dark text-white absolute left-0 top-150 z-50">
                  {userSuggestion.data.map((name) => {
                    return (
                      <div
                        className="p-2 border-b cursor-pointer text-xs sm:text-sm"
                        key={name}
                        onClick={() => {
                          setUser((prev) => name);
                        }}
                      >
                        <p>{name}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {userSuggestion.message && (
                <div className="max-h-40 w-full bg-grey absolute left-0 top-110 z-50 flex justify-center items-center p-2 text-sm text-center">
                  <p>{userSuggestion.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="bg-rose/90 hover:bg-rose text-white px-6 py-2.5 rounded-md text-sm font-medium shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center space-x-2 min-w-[120px]"
          onClick={handleSubmit}
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
