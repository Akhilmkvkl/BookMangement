import { useEffect, useState } from "react";
import { axiosUserInstance } from "../../instance/axios";

// const bookList = [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     genre: "Classic",
//     imageUrl: "https://m.media-amazon.com/images/I/51n-q69gn4L.jpg",
//   },
//   {
//     id: 2,
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Classic",
//     imageUrl: "https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg",
//   },
//   {
//     id: 3,
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     genre: "Fantasy",
//     imageUrl:
//       "https://m.media-amazon.com/images/P/B0BWYWQ1XF.01._SCLZZZZZZZ_SX500_.jpg",
//   },
//   {
//     id: 4,
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     genre: "Classic",
//     imageUrl:
//       "https://m.media-amazon.com/images/I/51n4BlaMF-L._SY344_BO1,204,203,200_.jpg",
//   },
// ];

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookList,setBookList]=useState([])

    const getdata=async()=>{
        try {
            const res= await axiosUserInstance.get('/getbooks')
            if(res){
                console.log(res)
                setBookList(res.data.books)

            }

        } catch (error) {
             console.log(error)
        }
    }

    useEffect(()=>{
        try {
            getdata()
        } catch (error) {
            
        }
    })

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
