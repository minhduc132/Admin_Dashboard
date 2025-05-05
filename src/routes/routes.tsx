import { createBrowserRouter, useLocation } from 'react-router-dom';
import {
  EcommerceDashboardPage,
  MarketingDashboardPage,
  SocialMediaDashboardPage,
  CategoryDashboardPage,
  PasswordResetPage,
  BlogsDashboardPage,
  UserDashboardPage,
  ProductDashboardPage,
  BrandsDashboardPage,
  OrdersDashboardPage,
  ReferDashboardPage,
  FraudDetectionDashboardPage,
  SignInPage,
  SignUpPage,
  WelcomePage,
} from '../pages';
import { ProtectedRoute } from '../layouts/app/ProtectedRoute'
import {
  DashboardLayout,
} from '../layouts';
import React, { ReactNode, useEffect } from 'react';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

type PageProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    // element: <PageWrapper children={<GuestLayout />} />,
    children: [
      {
        index: true,
        path: '',
        element: <SignInPage />
      },
    ],
  },
  {
    path: '/dashboards',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'user',
        element: <UserDashboardPage />,
      },
      {
        path: 'ecommerce',
        element: <EcommerceDashboardPage />,
      },
      {
        path: 'blog',
        element: <BlogsDashboardPage />,
      },
      {
        path: 'ref',
        element: <ReferDashboardPage />,
      },
      {
        path: 'report',
        element: <FraudDetectionDashboardPage />,
      },
      {
        path: 'social',
        element: <SocialMediaDashboardPage />,
      },

    ],
  },
  {
    path: '/shop',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'products',
        element: <ProductDashboardPage />,
      },
      {
        path: 'brands',
        element: <BrandsDashboardPage />,
      },
      {
        path: 'orders',
        element: <OrdersDashboardPage />,
      },
      {
        path: 'categories',
        element: <CategoryDashboardPage />,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'welcome',
        element: <WelcomePage />,
      },
      {
        path: 'password-reset',
        element: <PasswordResetPage />,
      },
    ],
  },
]);

export default router;
