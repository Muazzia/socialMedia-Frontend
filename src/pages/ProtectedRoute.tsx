import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
