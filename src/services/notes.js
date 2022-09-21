import axios from "axios";

const baseUrl = `http://localhost:3001/api/notes`;

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then( response => response.data );
}
const create = (newNote) => axios.post(baseUrl, newNote).then(response => response.data);
const update = (id, newNote) => axios.put(`${baseUrl}/${id}`, newNote).then(response => response.data);

export default {
    getAll: getAll,
    create: create,
    update: update
};
