import axios from "axios";

const api = axios.create({
  baseURL: "https://bookmanagementapi-production.up.railway.app/api",
});

// Normalize functions
export const normalizeAuthor = (data) => ({
  id: data._id,
  name: data.name,
  nationality: data.nationality,
  birthYear: data.birthYear ? String(data.birthYear) : "",
  bio: data.bio,
});

export const normalizeBook = (data) => ({
  id: data._id,
  title: data.title,
  description: data.description,
  authorId: typeof data.author === "object" ? data.author._id : data.author,
  genre: data.genre,
  year: data.publishedYear ? String(data.publishedYear) : "",
  price: data.price,
});

// Serialize functions
export const serializeAuthor = (data) => ({
  name: data.name,
  nationality: data.nationality,
  birthYear: data.birthYear ? Number(data.birthYear) : undefined,
  bio: data.bio,
});

export const serializeBook = (data) => ({
  title: data.title,
  description: data.description,
  author: data.authorId,
  genre: data.genre,
  publishedYear: data.year ? Number(data.year) : undefined,
  price: data.price ? Number(data.price) : undefined,
});

// Author API
export const authorApi = {
  getAll: async () => {
    const res = await api.get("/authors");
    return res.data.map(normalizeAuthor);
  },
  create: async (payload) => {
    const res = await api.post("/authors", serializeAuthor(payload));
    return normalizeAuthor(res.data);
  },
  update: async (id, payload) => {
    const res = await api.put(`/authors/${id}`, serializeAuthor(payload));
    return normalizeAuthor(res.data);
  },
  delete: async (id) => {
    await api.delete(`/authors/${id}`);
  },
};

// Book API
export const bookApi = {
  getAll: async (params = {}) => {
    const res = await api.get("/books", { params });
    return res.data.map(normalizeBook);
  },
  create: async (payload) => {
    const res = await api.post("/books", serializeBook(payload));
    return normalizeBook(res.data);
  },
  update: async (id, payload) => {
    const res = await api.put(`/books/${id}`, serializeBook(payload));
    return normalizeBook(res.data);
  },
  delete: async (id) => {
    await api.delete(`/books/${id}`);
  },
};

export default api;
