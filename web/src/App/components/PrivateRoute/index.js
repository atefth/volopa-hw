import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
    const { auth } = useSelector(x => x);
    if (!auth.token) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }
    // authorized so return child components
    return children;
}

export { PrivateRoute };
