import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux';
const AdminRoute = ({children, ...rest}) => {
    const { userInfo } = useSelector((state) => state.user);
    let {user} = useContext(AuthContext)
 
    return !(user && userInfo?.is_staff) ?  <Navigate to='/login'/> : children;
}

export default AdminRoute;
  
