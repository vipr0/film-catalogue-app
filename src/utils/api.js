import axios from 'axios';

export const apiUrl = process.env.REACT_APP_API_URL

const api = {
    getAllFilms: async () => await axios.get(`${apiUrl}/films`),
    getFilm: async (id) => await axios.get(`${apiUrl}/films/${id}`),
    addNewFilm: async (body) => await axios.post(`${apiUrl}/films`, body),
    deleteFilm: async (id) => await axios.delete(`${apiUrl}/films/${id}`),
    importFilmsFromFile: async (body) => await axios.post(`${apiUrl}/films/import`, body),
    searchFilm: async (queryStr) => await axios.get(`${apiUrl}/films/search?query=${queryStr}`),
}

export default api;