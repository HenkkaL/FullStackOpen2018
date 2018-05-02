import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(responce => responce.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(responce => responce.data)
}

const deleteContact = (id) => {
    const request = axios.delete(baseUrl + "/" + id)
    return request
}

export default { getAll, create, deleteContact }