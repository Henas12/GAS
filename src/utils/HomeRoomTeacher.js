import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux';
const TeacherRoute = ({children, ...rest}) => {
    const { studentInfo } = useSelector((state) => state.user);
    let {user} = useContext(AuthContext)
    console.log(studentInfo)
 
    return !(user && studentInfo?.is_hrt) ?  <Navigate to='/login'/> : children;
}

export default TeacherRoute;
  