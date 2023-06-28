import axiosInstance, { axiosPublicInstance } from "../helpers/axiosfile"

const getUser = async () => {
    return await axiosInstance.get("/users")
}
const loginUsers = async (loginUsers) => {
    return await axiosPublicInstance.get("/posts", loginUsers)
}
const deleteUser = async (id) => {
    return await axiosInstance.delete(`/users/${id}`)
}
const editUser = async (id, payloaddata) => {
    return await axiosInstance.put(`/users/${id}`, payloaddata)
}
const getInitialdata = async () => {
    return await axiosInstance.get(`/Config`)
}
const updateSite = async (id, payload) => {
    return await axiosInstance.put(`/Config/${id}`, payload)
}
export { getUser, loginUsers, deleteUser, editUser, updateSite, getInitialdata }