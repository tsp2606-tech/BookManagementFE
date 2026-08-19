import { useState, useEffect } from "react";
import Header from "./components/Header";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import { authorApi, bookApi } from "./services/api";

export default function App() {
  const [activeView, setActiveView] = useState("books");
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    try {
      const [fetchedAuthors, fetchedBooks] = await Promise.all([
        authorApi.getAll(),
        bookApi.getAll()
      ]);
      setAuthors(fetchedAuthors);
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Book Handlers
  const handleSaveBook = async (bookData) => {
    try {
      if (bookData.id) {
        const updated = await bookApi.update(bookData.id, bookData);
        setBooks((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b))
        );
      } else {
        const created = await bookApi.create(bookData);
        setBooks((prev) => [...prev, created]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        showToast("Sách không tồn tại (có thể đã bị xoá bởi người khác)");
        loadData();
      } else {
        showToast("Có lỗi xảy ra khi lưu sách.");
      }
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await bookApi.delete(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      if (error.response?.status === 404) {
        showToast("Sách không tồn tại (có thể đã bị xoá bởi người khác)");
        loadData();
      } else {
        showToast("Có lỗi xảy ra khi xoá sách.");
      }
    }
  };

  // Author Handlers
  const handleSaveAuthor = async (authorData) => {
    try {
      if (authorData.id) {
        const updated = await authorApi.update(authorData.id, authorData);
        setAuthors((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
      } else {
        const created = await authorApi.create(authorData);
        setAuthors((prev) => [...prev, created]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        showToast("Tác giả không tồn tại (có thể đã bị xoá bởi người khác)");
        loadData();
      } else {
        showToast("Có lỗi xảy ra khi lưu tác giả.");
      }
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await authorApi.delete(id);
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      if (error.response?.status === 404) {
        showToast("Tác giả không tồn tại (có thể đã bị xoá bởi người khác)");
        loadData();
      } else {
        showToast(error.response?.data?.error || "Có lỗi xảy ra khi xoá tác giả.");
      }
    }
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
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 z-50">
          <svg
            className="w-5 h-5 text-red-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
