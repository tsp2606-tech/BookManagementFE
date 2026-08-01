import { BookOpen, Users } from "lucide-react";

export default function Header({ activeView, setActiveView }) {
  return (
    <aside className="w-[210px] bg-white border-r border-gray-200 min-h-screen flex flex-col shrink-0">
      <div className="p-5 flex items-center gap-2.5 border-b border-gray-100">
        <svg
          className="w-6 h-6 text-indigo-600 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="4" y1="5" x2="4" y2="19" />
          <line x1="8" y1="5" x2="8" y2="19" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="16" y1="5" x2="20" y2="19" />
        </svg>
        <span className="font-bold text-lg text-gray-900 tracking-tight">BookManager</span>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setActiveView("books")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                activeView === "books"
                  ? "border-indigo-600 bg-indigo-50/70 text-indigo-600"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Quản lý Sách</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveView("authors")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                activeView === "authors"
                  ? "border-indigo-600 bg-indigo-50/70 text-indigo-600"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Quản lý Tác giả</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
