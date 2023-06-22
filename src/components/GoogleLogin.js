
import image from "../../src/images/google.jpeg";
import { useGoogleLogin } from '@react-oauth/google';
const Googlelogin = ({ onSubmit }) => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => onSubmit(tokenResponse),
    });

    return (
        <>

            <p
                onClick={() => login()}
                className="w-100 py-2 mb-3 justify-content-center google-login-btn"
                style={{ color: "rgba(0, 0, 0, 0.54)", backgroundColor: "transparent", cursor: "pointer" }} >
                <img className="btn img img-fluid" width="50" alt="google" src={image} />
                <span>Continue with Google </span>
            </p>
        </>
    )
}

export default Googlelogin
