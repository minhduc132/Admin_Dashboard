import { AppLayout } from '../app';
import {
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Image,
  Row,
  Tabs,
  TabsProps,
  theme,
  Typography,
} from 'antd';
import { Card } from '../../components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { USER_PROFILE_ITEMS } from '../../constants';
import { useStylesContext } from '../../context';

const { Link } = Typography;

import './styles.css';
import { useEffect, useState } from 'react';

const DESCRIPTION_ITEMS: DescriptionsProps['items'] = [
  {
    key: 'full-name',
    label: 'Name',
    children: <span>minhduc</span>,
  },
  {
    key: 'job-title',
    label: 'Job title',
    children: <span>Dashboard</span>,
  },
  {
    key: 'email',
    label: 'Email',
    children: (
      <Link href="mailto:minhducn812@gmail.com">
        minhducn812@gmail.com
      </Link>
    ),
  },
  {
    key: 'telephone',
    label: 'Phone',
    children: <Link href="tel:+84888458962">+84888458962</Link>,
  },
  {
    key: 'github',
    label: 'Github',
    children: (
      <Link href="#" target="_blank">
        Minh Đức
      </Link>
    ),
  },
  {
    key: 'twitter',
    label: 'Twitter',
    children: (
      <Link href="#" target="_blank">
        Minh Đức
      </Link>
    ),
  },
];

const TAB_ITEMS: TabsProps['items'] = USER_PROFILE_ITEMS.map((u) => ({
  key: u.title,
  label: u.title,
}));

export const UserAccountLayout = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const navigate = useNavigate();
  const stylesContext = useStylesContext();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(TAB_ITEMS[0].key);

  const onChange = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    console.log(location);
    const k =
      TAB_ITEMS.find((d) => location.pathname.includes(d.key))?.key || '';

    console.log(k);
    setActiveKey(k);
  }, [location]);

  return (
    <>
      <AppLayout>
        <Card
          className="user-profile-card-nav card"
          actions={[
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    colorBorderSecondary: 'none',
                  },
                },
              }}
            >
              <Tabs
                defaultActiveKey={activeKey}
                activeKey={activeKey}
                items={TAB_ITEMS}
                onChange={onChange}
                style={{ textTransform: 'capitalize' }}
              />
            </ConfigProvider>,
          ]}
        >
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} sm={8} lg={4}>
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="user profile image"
                height="100%"
                width="100%"
                style={{ borderRadius }}
              />
            </Col>
            <Col xs={24} sm={16} lg={20}>
              <Descriptions
                title="User Info"
                items={DESCRIPTION_ITEMS}
                column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              />
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: '1.5rem' }}>
          <Outlet />
        </div>
      </AppLayout>
    </>
  );
};
