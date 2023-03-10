import { useEffect, useState } from "react";
import { axiosUserInstance } from "../../instance/axios";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg ">
      <div className="relative" style={{ padding: "20px 20px 0" }}>
        <img
          className="h-50 object-cover object-center rounded-t-lg  rounded-b-lg "
          src={book.imageUrl}
          alt={book.title}
          style={{ width: "70vw" }}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-gray-600">{book.genre}</p>
      </div>
    </div>
  );
}

function Book() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookList, setBookList] = useState([]);

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

  const filteredBooks = bookList.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const genres = ["All", ...new Set(bookList.map((book) => book.genre))];

  return (
    <div className="container mx-auto px-4 py-8 flex-wrap">
      <div className="flex justify-between items-center mb-8">
        <div>
          <input
            type="text"
            placeholder="Search by book title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-80"
          />
        </div>
        <div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 flex-wrap">
        {filteredBooks
          .filter(
            (book) => selectedGenre === "All" || book.genre === selectedGenre
          )
          .map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
      </div>
    </div>
  );
}

export default Book;
