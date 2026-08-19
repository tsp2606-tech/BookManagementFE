import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AuthorModal({
  isOpen,
  onClose,
  onSave,
  authorToEdit,
}) {
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authorToEdit) {
      setName(authorToEdit.name || "");
      setNationality(authorToEdit.nationality || "");
      setBirthYear(authorToEdit.birthYear || "");
      setBio(authorToEdit.bio || "");
    } else {
      setName("");
      setNationality("");
      setBirthYear("");
      setBio("");
    }
    setErrors({});
  }, [authorToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Tên tác giả là bắt buộc";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newName = name.trim();
    const newNationality = nationality.trim();
    const newBirthYear = birthYear ? String(birthYear).trim() : "";
    const newBio = bio.trim();

    if (
      authorToEdit &&
      newName === (authorToEdit.name || "") &&
      newNationality === (authorToEdit.nationality || "") &&
      newBirthYear === (authorToEdit.birthYear || "") &&
      newBio === (authorToEdit.bio || "")
    ) {
      alert("Không có gì thay đổi cả");
      onClose();
      return;
    }

    onSave({
      ...(authorToEdit ? { id: authorToEdit.id } : {}),
      name: name.trim(),
      nationality: nationality.trim(),
      birthYear: birthYear ? String(birthYear).trim() : "",
      bio: bio.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[380px] sm:max-w-[420px] relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {authorToEdit ? "Sửa Tác Giả" : "Thêm Tác Giả"}
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
          {/* Tên tác giả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tác giả <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="VD: Nam Cao..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Quốc tịch & Năm sinh */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quốc tịch
              </label>
              <input
                type="text"
                placeholder="Việt Nam"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Năm sinh
              </label>
              <input
                type="number"
                min="0"
                placeholder="1915"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Tiểu sử */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiểu sử
            </label>
            <textarea
              rows={4}
              placeholder="Đôi nét về tác giả..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 resize-none"
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
              Lưu Tác Giả
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
