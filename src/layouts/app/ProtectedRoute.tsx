import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
};
