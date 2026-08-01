import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

export default function BookList({
  books,
  authors,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteBook,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tất cả thể loại");

  // Derive unique genres list for dropdown
  const genres = [
    "Tất cả thể loại",
    ...Array.from(new Set(books.map((b) => b.genre).filter(Boolean))),
  ];

  // Regex & Genre composition filtering
  const filteredBooks = books.filter((book) => {
    let matchesSearch = true;
    if (searchQuery.trim()) {
      try {
        const regex = new RegExp(searchQuery, "i");
        matchesSearch = regex.test(book.title);
      } catch (e) {
        matchesSearch = book.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
    }

    let matchesGenre = true;
    if (selectedGenre && selectedGenre !== "Tất cả thể loại") {
      matchesGenre = book.genre === selectedGenre;
    }

    return matchesSearch && matchesGenre;
  });

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sách này khỏi hệ thống?")) {
      onDeleteBook(id);
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") return "";
    return new Intl.NumberFormat("vi-VN").format(Number(price)) + " đ";
  };

  const getAuthorNameAndInitial = (authorId) => {
    const author = authors.find((a) => String(a.id) === String(authorId));
    if (!author) return { name: "N/A", initial: "?" };
    const initial = author.name.trim().charAt(0).toUpperCase();
    return { name: author.name, initial };
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Sách</h1>
          <p className="text-sm text-gray-500 mt-1">
            Danh sách sách. Kiểm tra tính năng Populate thông qua trường Tác giả.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Sách</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm tên sách (Kiểm tra Regex)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
          />
        </div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-48 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-white text-xs font-semibold text-gray-500">
                <th className="py-4 px-6 font-semibold">Tên Sách</th>
                <th className="py-4 px-6 font-semibold">Tác giả (Populated)</th>
                <th className="py-4 px-6 font-semibold">Thể loại</th>
                <th className="py-4 px-6 font-semibold">Năm XB</th>
                <th className="py-4 px-6 font-semibold">Giá</th>
                <th className="py-4 px-6 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400">
                    Không tìm thấy sách phù hợp
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => {
                  const { name: authorName, initial } = getAuthorNameAndInitial(
                    book.authorId
                  );

                  return (
                    <tr
                      key={book.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 max-w-[210px]">
                        <div className="font-medium text-gray-900 truncate" title={book.title}>
                          {book.title}
                        </div>
                        {book.description && (
                          <div className="text-xs text-gray-400 truncate mt-0.5" title={book.description}>
                            {book.description}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center shrink-0">
                            {initial}
                          </span>
                          <span className="font-medium text-gray-800">
                            {authorName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {book.genre && (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                            {book.genre}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{book.year}</td>
                      <td className="py-4 px-6 font-medium text-gray-800">
                        {formatPrice(book.price)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => onOpenEditModal(book)}
                            className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                            title="Sửa"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
