import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

function PrivateRouter({ children }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if(!user) {
        navigate('/auth');
    }
    return children;
}

export default PrivateRouter;