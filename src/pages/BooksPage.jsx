import { useState } from "react";
import BookList from "../components/BookList";
import BookModal from "../components/BookModal";

export default function BooksPage({ books, authors, onSaveBook, onDeleteBook }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleOpenAddModal = () => {
    setBookToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setBookToEdit(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookToEdit(null);
  };

  return (
    <div>
      <BookList
        books={books}
        authors={authors}
        onOpenAddModal={handleOpenAddModal}
        onOpenEditModal={handleOpenEditModal}
        onDeleteBook={onDeleteBook}
      />
      <BookModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={onSaveBook}
        bookToEdit={bookToEdit}
        authors={authors}
      />
    </div>
  );
}
