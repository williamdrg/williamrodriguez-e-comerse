import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    
    const token = localStorage.getItem("token")
    // null -> no hay token
    // "valor almacenado en el local" -> hay token 
            if (token) {
                return <Outlet />
            } else {
                return <Navigate to='/login' />
            }
       
    
};

export default ProtectedRoute;