import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEllipsisV } from "react-icons/fa";
import { axiosAdminInstance, axiosUserInstance } from "../../instance/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AdminHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState("");

  const handleToggleDropdown = (name) => {
    setIsOpen(name);
  };

  const getdata = async () => {
    try {
      const res = await axiosUserInstance.get("/getbooks");
      if (res) {
        console.log(res);
        setBookList(res.data.Books);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
      getdata();
    } catch (error) {}
  }, []);

  const filteredBooks = bookList.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = book.author
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || authorMatch;
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddBook = () => {
    setShowAddBookForm(true);
  };

  const handleCloseAddBookForm = () => {
    setShowAddBookForm(false);
  };

  const handleDelete = async (Bookname) => {
    setIsOpen("");
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosAdminInstance.post("/deleteBook", {
            Bookname,
          });
          if (res.data.msg === "sucess") {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            getdata();
          }
        } else {
          setIsOpen("");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (book) => {
    console.log(book);
    try {
      Swal.fire({
        title: book.title,
        text: book.author,
        imageUrl: book.imageUrl,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: book.title,
      });
      setIsOpen("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !genre || !imageUrl) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Please fill in all fields",
      });
    } else {
      const newBookdata = {
        title,
        author,
        genre,
        imageUrl,
      };
      try {
        const res = await axiosAdminInstance.post("/addbook", { newBookdata });
        if (res.data.msg === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Book has been added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        getdata();
        setAuthor("");
        setTitle("");
        setGenre("");
        setImageUrl("");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "",
          text: error.response.data.msg,
        });
      }
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button
          onClick={handleAddBook}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <FaPlus className="h-5 w-5 mr-2 inline" />
          Add Book
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 ">
        {filteredBooks.map((book) => {
          return (
            <div className="flex items-center w-72vw  mb-10 justify-between p-4 border border-gray-300 rounded-md shadow-md">
              <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden">
                <img
                  className="object-cover h-full w-full"
                  src={book.imageUrl}
                  alt={book.title}
                />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-semibold text-lg">{book.title}</h2>
                <p className="text-gray-500">{book.author}</p>
                <p className="text-gray-500">{book.genre}</p>
              </div>
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                  onClick={() => {
                    handleToggleDropdown(book.title);
                  }}
                >
                  <FaEllipsisV />
                </button>
                {isOpen === book.title && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => handleDelete(book.title)}
                        role="menuitem"
                      >
                        Delete
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => handleView(book)}
                        role="menuitem"
                      >
                        View
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showAddBookForm && (
        <div className="fixed inset-0  bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Add Book</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="author"
                >
                  Author
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="author"
                  type="text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="genre"
                >
                  Genre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="genre"
                  type="text"
                  placeholder="Enter book genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="imageUrl"
                >
                  Image URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="imageUrl"
                  type="text"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseAddBookForm}
                  className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="flex justify-end">
              <button
                onClick={handleCloseAddBookForm}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
