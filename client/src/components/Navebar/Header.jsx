import React, { useEffect, useState } from "react";
import { FiPower } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const [logined, setlogined] = useState(false);

  const navigate = useNavigate();
  const check = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setlogined(true);
    }
  };

  const logout = () => {
    Swal.fire({
      title: "Do you want to Logout?",

      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Logout success!", "", "success");
        localStorage.clear();
        navigate("/");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <header className="bg-blue-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-white text-center text-2xl font-bold uppercase">
          BOOK MANAGEMENT SYSTEM
        </h1>
        {logined ? (
          <button
            data-modal-target="popup-modal"
            data-modal-toggle="popup-modal"
            className="text-white hover:text-gray-200"
          >
            <FiPower
              size={20}
              onClick={() => {
                logout();
              }}
            />
          </button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}

export default Header;
