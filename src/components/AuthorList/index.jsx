import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AuthorList({
  authors,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteAuthor,
}) {
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tác giả này khỏi hệ thống?")) {
      onDeleteAuthor(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Tác giả</h1>
          <p className="text-sm text-gray-500 mt-1">
            Danh sách các tác giả hiện có trong hệ thống.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Tác giả</span>
        </button>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 relative group hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top row: Name & Hover action icons */}
            <div>
              <div className="flex items-start justify-between mb-4 pr-12">
                <h3 className="font-bold text-gray-900 text-base">
                  {author.name}
                </h3>
              </div>

              {/* Hover Edit/Delete Action Buttons */}
              <div className="absolute top-5 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <button
                  onClick={() => onOpenEditModal(author)}
                  className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                  title="Sửa"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(author.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Details rows */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Quốc tịch</span>
                  <span className="font-medium text-gray-800">
                    {author.nationality || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Năm sinh</span>
                  <span className="font-semibold text-indigo-600">
                    {author.birthYear || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio section */}
            <div className="pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-indigo-600 block mb-1">
                Tiểu sử
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">
                {author.bio || "Chưa có thông tin tiểu sử."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
