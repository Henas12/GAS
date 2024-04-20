import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux';
const TeacherRoute = ({children, ...rest}) => {
    const { userInfo } = useSelector((state) => state.user);
    let {user} = useContext(AuthContext)
 
    return !(user && userInfo?.is_hrts) ?  <Navigate to='/hena'/> : children;
}

export default TeacherRoute;
  