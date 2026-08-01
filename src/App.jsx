import { useState } from "react";
import Header from "./components/Header";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";

const INITIAL_AUTHORS = [
  {
    id: "1",
    name: "J.K. Rowling",
    nationality: "UK",
    birthYear: "1965",
    bio: "Tác giả người Anh, nổi tiếng với series Harry Potter."
  },
  {
    id: "2",
    name: "Paulo Coelho",
    nationality: "Brazil",
    birthYear: "1947",
    bio: "Tiểu thuyết gia người Brazil."
  },
  {
    id: "3",
    name: "Nguyễn Nhật Ánh",
    nationality: "Việt Nam",
    birthYear: "1955",
    bio: "Nhà văn chuyên viết cho thanh thiếu niên."
  }
];

const INITIAL_BOOKS = [
  {
    id: "1",
    title: "Harry Potter và Hòn đá Phù thủy",
    description: "Cậu bé mồ côi khám phá ra mình là một phù thủy và nhập học Trường Pháp thuật Hogwarts.",
    authorId: "1",
    genre: "Fantasy",
    year: "1997",
    price: 150000
  },
  {
    id: "2",
    title: "Nhà Giả Kim",
    description: "Hành trình theo đuổi giấc mơ của cậu bé chăn cừu Santiago.",
    authorId: "2",
    genre: "Fiction",
    year: "1988",
    price: 79000
  },
  {
    id: "3",
    title: "Mắt Biếc",
    description: "Câu chuyện tình dang dở của Ngạn và Hà Lan.",
    authorId: "3",
    genre: "Romance",
    year: "1990",
    price: 110000
  }
];

export default function App() {
  const [activeView, setActiveView] = useState("books");
  const [authors, setAuthors] = useState(INITIAL_AUTHORS);
  const [books, setBooks] = useState(INITIAL_BOOKS);

  // Book Handlers
  const handleSaveBook = (bookData) => {
    if (bookData.id) {
      setBooks((prev) =>
        prev.map((b) => (b.id === bookData.id ? { ...b, ...bookData } : b))
      );
    } else {
      const newBook = {
        ...bookData,
        id: Date.now().toString()
      };
      setBooks((prev) => [...prev, newBook]);
    }
  };

  const handleDeleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // Author Handlers
  const handleSaveAuthor = (authorData) => {
    if (authorData.id) {
      setAuthors((prev) =>
        prev.map((a) => (a.id === authorData.id ? { ...a, ...authorData } : a))
      );
    } else {
      const newAuthor = {
        ...authorData,
        id: Date.now().toString()
      };
      setAuthors((prev) => [...prev, newAuthor]);
    }
  };

  const handleDeleteAuthor = (id) => {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100/70">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto py-8 px-8">
          {activeView === "books" ? (
            <BooksPage
              books={books}
              authors={authors}
              onSaveBook={handleSaveBook}
              onDeleteBook={handleDeleteBook}
            />
          ) : (
            <AuthorsPage
              authors={authors}
              onSaveAuthor={handleSaveAuthor}
              onDeleteAuthor={handleDeleteAuthor}
            />
          )}
        </div>
      </main>
    </div>
  );
}
