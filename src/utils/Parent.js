import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useSelector } from 'react-redux';
const ParentRoute = ({children, ...rest}) => {
    const { studentInfo } = useSelector((state) => state.user);
    let {user} = useContext(AuthContext)
    console.log(studentInfo)
 
    return !(user && studentInfo?.is_parent) ?  <Navigate to='/login'/> : children;
}

export default ParentRoute;
  