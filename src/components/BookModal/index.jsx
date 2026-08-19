import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BookModal({
  isOpen,
  onClose,
  onSave,
  bookToEdit,
  authors,
}) {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || "");
      setAuthorId(bookToEdit.authorId || "");
      setGenre(bookToEdit.genre || "");
      setYear(bookToEdit.year || "");
      setPrice(bookToEdit.price !== undefined ? bookToEdit.price : "");
      setDescription(bookToEdit.description || "");
    } else {
      setTitle("");
      setAuthorId("");
      setGenre("");
      setYear("");
      setPrice("");
      setDescription("");
    }
    setErrors({});
  }, [bookToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Tên sách là bắt buộc";
    }
    if (!authorId) {
      newErrors.authorId = "Vui lòng chọn tác giả";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTitle = title.trim();
    const newAuthorId = String(authorId).trim();
    const newGenre = genre.trim();
    const newYear = year ? String(year).trim() : "";
    const newPrice = price !== "" ? Number(price) : "";
    const newDesc = description.trim();

    if (
      bookToEdit &&
      newTitle === (bookToEdit.title || "") &&
      newAuthorId === String(bookToEdit.authorId || "") &&
      newGenre === (bookToEdit.genre || "") &&
      newYear === String(bookToEdit.year || "") &&
      newPrice === (bookToEdit.price !== undefined ? bookToEdit.price : "") &&
      newDesc === (bookToEdit.description || "")
    ) {
      onClose();
      return;
    }

    onSave({
      ...(bookToEdit ? { id: bookToEdit.id } : {}),
      title: title.trim(),
      authorId,
      genre: genre.trim(),
      year: year ? String(year).trim() : "",
      price: price !== "" ? Number(price) : "",
      description: description.trim() || (bookToEdit?.description ?? ""),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[380px] sm:max-w-[420px] relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {bookToEdit ? "Sửa Sách" : "Thêm Sách Mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tên sách */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sách <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên sách..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Tác giả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tác giả <span className="text-red-500">*</span>
            </label>
            <select
              value={authorId}
              onChange={(e) => {
                setAuthorId(e.target.value);
                if (errors.authorId)
                  setErrors((prev) => ({ ...prev, authorId: null }));
              }}
              className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer ${
                errors.authorId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Chọn tác giả --</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.authorId && (
              <p className="text-red-500 text-xs mt-1">{errors.authorId}</p>
            )}
          </div>

          {/* Thể loại & Năm xuất bản */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thể loại
              </label>
              <input
                type="text"
                placeholder="VD: Fantasy"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Năm xuất bản
              </label>
              <input
                type="text"
                placeholder="2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Giá (VNĐ) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá (VNĐ)
            </label>
            <input
              type="number"
              placeholder="150000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-xs"
            >
              Lưu Sách
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
