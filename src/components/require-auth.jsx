import { UrlState } from '@/context'; 
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

function RequireAuth({ children }) {
    const navigate = useNavigate();
    const { loading, isAuthenticated } = UrlState();

    useEffect(() => {
        // Redirect if not authenticated and loading is false
        if (!isAuthenticated && !loading) {
            navigate("/auth");
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

    // If authenticated, render children (protected routes)
    if (isAuthenticated) {
        return children;
    }

    // Redirect to login if not authenticated
    return null;
}

export default RequireAuth;
