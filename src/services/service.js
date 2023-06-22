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
export { getUser, loginUsers, deleteUser, editUser }