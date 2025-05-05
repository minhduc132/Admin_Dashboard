import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { HomeOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, PageHeader } from '../../components/';
import { UserTable } from '../../components/user/UserTable';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useFetchData } from '../../hooks';
import { User } from '../../types/authService';
import AddUserModal from '../../components/dashboard/modal/add';
import { DASHBOARD_ITEMS } from '../../constants';
import { canPerformUserManagement } from '../../types/authService';
import { getCurrentUser } from '../../types/authService';
import { initializeDefaultUsers } from '../../types/authService';

const PROJECT_TABS = [
  { key: 'all', label: 'All users' },
  { key: 'superAdmin', label: 'Super Admin' },
  { key: 'admin', label: 'Admin' },
  { key: 'seller', label: 'Seller' },
  { key: 'buyer', label: 'Buyer' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'organization', label: 'Organization' },
  { key: 'kol', label: 'KOL' },
  { key: 'partner', label: 'Partner' },
  { key: 'employee', label: 'Employee' },
];

export const UserDashboardPage = () => {
  const userRole = getCurrentUser()?.role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [projectTabsKey, setProjectsTabKey] = useState<string>('all');

  const {
    data: usersData,
    error: usersDataError,
    loading: usersDataLoading,
  } = useFetchData('../mocks/User.json');

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleOk = () => setIsModalOpen(false);

  const handleAddUser = (newUser: User) => {
    const updatedList = [newUser, ...userList];
    setUserList(updatedList);
    localStorage.setItem('userList', JSON.stringify(updatedList)); // Lưu vào localStorage
  };

  useEffect(() => {
    initializeDefaultUsers();
    const savedList = localStorage.getItem('userList');
    if (savedList) {
      const parsedList = JSON.parse(savedList);
      if (Array.isArray(parsedList) && parsedList.length > 0) {
        setUserList(parsedList);
      } else if (usersData && Array.isArray(usersData)) {
        setUserList(usersData);
        localStorage.setItem('userList', JSON.stringify(usersData));
      }
    } else if (usersData && Array.isArray(usersData)) {
      setUserList(usersData);
      localStorage.setItem('userList', JSON.stringify(usersData));
    }
  }, [usersData]);

  const PROJECT_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: <UserTable key="all" data={userList} />,
    superAdmin: (
      <UserTable
        key="super admin"
        data={userList.filter((u) => u.role === 'Super Admin')}
      />
    ),
    admin: (
      <UserTable
        key="admin"
        data={userList.filter((u) => u.role === 'Admin')}
      />
    ),
    supplier: (
      <UserTable
        key="supplier"
        data={userList.filter((u) => u.role === 'Supplier')}
      />
    ),
    organization: (
      <UserTable
        key="organization"
        data={userList.filter((u) => u.role === 'Organization')}
      />
    ),
    buyer: (
      <UserTable
        key="buyer"
        data={userList.filter((u) => u.role === 'Buyer')}
      />
    ),
    seller: (
      <UserTable
        key="seller"
        data={userList.filter((u) => u.role === 'Seller')}
      />
    ),
    kol: (
      <UserTable
        key="kol"
        data={userList.filter((u) => u.role === 'KOL')}
      />
    ),
    partner: (
      <UserTable
        key="partner"
        data={userList.filter((u) => u.role === 'Partner')}
      />
    ),
    employee: (
      <UserTable
        key="employee"
        data={userList.filter((u) => u.role === 'Employee')}
      />
    ),
  };

  return (
    <div>
      <Helmet>
        <title>User Dashboard</title>
      </Helmet>

      <PageHeader
        title=""
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>Dashboards</span>
              </>
            ),
            menu: {
              items: DASHBOARD_ITEMS.map((d) => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          { title: 'User' },
        ]}
      />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="User"
            extra={
              canPerformUserManagement() && (
                <Space>
                  <Button icon={<PlusOutlined />} onClick={showModal}>
                    New user
                  </Button>
                </Space>
              )
            }
            tabList={PROJECT_TABS}
            activeTabKey={projectTabsKey}
            onTabChange={setProjectsTabKey}
          >
            {PROJECT_TABS_CONTENT[projectTabsKey]}
          </Card>

          <AddUserModal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            onAddUser={handleAddUser}
          />
        </Col>
      </Row>
    </div>
  );
};
