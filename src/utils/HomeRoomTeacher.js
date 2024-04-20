import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux';
const TeacherRoute = ({children, ...rest}) => {
    const { userInfo } = useSelector((state) => state.user);
    let {user} = useContext(AuthContext)
    console.log(userInfo)
 
    return !(user && userInfo?.is_hrt) ?  <Navigate to='/login'/> : children;
}

export default TeacherRoute;
  