import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(res => res.data)
}

const remove = (id, newContact) => {
    const request = axios.delete(`${baseUrl}/${id}`, newContact)
    return request.then(res => res.data)
}

const update = (id, newContact) => {
    const request = axios.put(`${baseUrl}/${id}`, newContact)
    return request.then(res => res.data)
}

export default { getAll, create, remove, update }