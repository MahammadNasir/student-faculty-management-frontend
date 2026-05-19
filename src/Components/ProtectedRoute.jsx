import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ allowedRole, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to={"login"} />
  }
  else if (!allowedRole.includes(user.role)) {
    return <Navigate to={"/unauthorized"} />
  }
  return children;
}



