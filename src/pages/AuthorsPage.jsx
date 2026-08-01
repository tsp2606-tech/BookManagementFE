import { useState } from "react";
import AuthorList from "../components/AuthorList";
import AuthorModal from "../components/AuthorModal";

export default function AuthorsPage({ authors, onSaveAuthor, onDeleteAuthor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorToEdit, setAuthorToEdit] = useState(null);

  const handleOpenAddModal = () => {
    setAuthorToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (author) => {
    setAuthorToEdit(author);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAuthorToEdit(null);
  };

  return (
    <div>
      <AuthorList
        authors={authors}
        onOpenAddModal={handleOpenAddModal}
        onOpenEditModal={handleOpenEditModal}
        onDeleteAuthor={onDeleteAuthor}
      />
      <AuthorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={onSaveAuthor}
        authorToEdit={authorToEdit}
      />
    </div>
  );
}
