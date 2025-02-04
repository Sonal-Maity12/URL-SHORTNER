import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading, navigate]); // ✅ Added `navigate` to dependencies to avoid warnings

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

  if (!isAuthenticated) return null; // ✅ Prevents unauthorized content from rendering

  return children;
}

export default RequireAuth;
