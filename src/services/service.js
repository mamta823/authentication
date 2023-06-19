import axiosInstance, { axiosPublicInstance } from "../helpers/axiosfile"

const getUser = async () => {
    return await axiosInstance.get("/users")
}
const loginUsers = async () => {
    return await axiosPublicInstance.get("/posts")
}
const deleteUser = async (id) => {
    return await axiosInstance.delete(`/users/${id}`)
}
export { getUser, loginUsers, deleteUser }