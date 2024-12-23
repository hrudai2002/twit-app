import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { selectUser } from "../redux/slices/userSlice";

function PrivateRouter({ children }) {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    if(!user) {
        navigate('/auth');
    }
    return children;
}

export default PrivateRouter;