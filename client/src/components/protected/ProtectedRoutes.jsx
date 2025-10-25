import { AuthContext } from '@/context/AuthContext'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';

const ProtectedRoutes = ({children}) => {
    const {user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && user === null){
            navigate('/login');
        }
    },[user, loading, navigate]);
  return (
    <>
     {children} 
    </>
  )
}

export default ProtectedRoutes
