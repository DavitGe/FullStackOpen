import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const addLike = async (id) => {
  const url = baseUrl + '/' + id
  const response = await axios.put(url)
  return response.data
}

const remove = async (id) => {
  const url = baseUrl + '/' + id
  const response = await axios.delete(url)
  return response.data
}

const exportedObject = {
  getAll: getAll,
  addBlog: addBlog,
  addLike: addLike,
  remove: remove
}
export default exportedObject