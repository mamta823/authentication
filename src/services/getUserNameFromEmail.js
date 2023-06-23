import axios from "axios";



const getProfileData = async (token) => {

    let { data } = await axios(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
};
export default getProfileData