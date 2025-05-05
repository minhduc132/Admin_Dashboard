import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  PieChartOutlined,
  ShopOutlined,
  CustomerServiceOutlined,
  BranchesOutlined,

} from '@ant-design/icons';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import {
  PATH_AUTH,
  PATH_DASHBOARD,
  PATH_LANDING,
  PATH_NETWORK,
} from '../../constants';
import { COLOR } from '../../App.tsx';
import { PATH_SHOP } from '../../constants/routes.ts';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  getItem('Dashboards', 'dashboards', <PieChartOutlined />, [
    getItem(
      <Link to={PATH_DASHBOARD.user}>User</Link>,
      'user',
      null
    ),
    // getItem(
    //   <Link to={PATH_DASHBOARD.ecommerce}>eCommerce</Link>,
    //   'ecommerce',
    //   null
    // ),
    // getItem(
    //   <Link to={PATH_DASHBOARD.marketing}>Marketing</Link>,
    //   'marketing',
    //   null
    // ),
    getItem(<Link to={PATH_DASHBOARD.blog}>Blog</Link>, 'blog', null),
    getItem(<Link to={PATH_DASHBOARD.ref}>Ref</Link>, 'ref', null),
    getItem(<Link to={PATH_DASHBOARD.report}>Report</Link>, 'report', null),
    getItem(<Link to={PATH_DASHBOARD.social}>Social</Link>, 'social', null),
    getItem(<Link to={PATH_DASHBOARD.faq}>FAQ</Link>, 'faq', null),
  ]),
  getItem('Shop', 'shop', <ShopOutlined />, [
    getItem(<Link to={PATH_SHOP.Order}>Order</Link>, 'orderShop', null),
    getItem(<Link to={PATH_SHOP.Product}>Product</Link>, 'productShop', null),
    getItem(<Link to={PATH_SHOP.Brand}>Brands</Link>, 'brandsShop', null),
    getItem(<Link to={PATH_SHOP.categories}>Category</Link>, 'categories', null),
    getItem(<Link to={PATH_SHOP.SalesProducts}>Sales Products</Link>, 'salesProducts', null),
    getItem(<Link to={PATH_SHOP.Affiliateprogram}>Affiliate program</Link>, 'affiliateprogram', null),
    getItem(<Link to={PATH_SHOP.Subcription}>Subcription</Link>, 'subcription', null),
    getItem(<Link to={PATH_SHOP.Supplier}>Supplier</Link>, 'Supplier', null),
    getItem(<Link to={PATH_SHOP.Fraud}>Fraud</Link>, 'fraud', null),
    getItem(<Link to={PATH_SHOP.Pricing}>Pricing</Link>, 'pricing', null),
    getItem(<Link to={PATH_SHOP.Booking}>Booking</Link>, 'booking', null),
  ]),
  getItem('Network', 'Network', <CustomerServiceOutlined />, [
    getItem(<Link to={PATH_NETWORK.Overview}>Overview</Link>, 'overviewNetwork', null),
    getItem(<Link to={PATH_NETWORK.Listings}>Listings</Link>, 'listingsNetwork', null),
    getItem(<Link to={PATH_NETWORK.Category}>Category</Link>, 'categoryNetwork', null),
    getItem(<Link to={PATH_NETWORK.User}>User </Link>, 'userNetwork ', null),
    getItem(<Link to={PATH_NETWORK.Blog}>Blog</Link>, 'blogNetWork', null),
    getItem(<Link to={PATH_NETWORK.Review}>Review</Link>, 'reviewNetwork', null),
    getItem(<Link to={PATH_NETWORK.Request}>Request</Link>, 'requestNetWork', null),
    getItem(<Link to={PATH_NETWORK.BrandingAndPolicy}>Branding and Policy</Link>, 'brandingNetWork', null),
    getItem(<Link to={PATH_NETWORK.Businesss}>BusinesssLegal</Link>, 'businesssLegalNetWork', null),
    getItem(<Link to={PATH_NETWORK.Order}>Order</Link>, 'orderNetwork', null),
    getItem(<Link to={PATH_NETWORK.Fraud}>Fraud</Link>, 'fraudNetwork', null),
    getItem(<Link to={PATH_NETWORK.Email}>Email</Link>, 'emailNEtWork', null),
    getItem(<Link to={PATH_NETWORK.Affiliate}>Affiliate</Link>, 'affiliateNEtWork', null),
    getItem(<Link to={PATH_NETWORK.Organization}>Organization</Link>, 'organization', null),
    getItem(<Link to={PATH_NETWORK.Marketing}>Marketing</Link>, 'marketing', null),
    getItem(<Link to={PATH_NETWORK.Sales}>Sales</Link>, 'sales', null),
    getItem(<Link to={PATH_NETWORK.Promote}>Promote</Link>, 'promote', null),
  ]),
  getItem('Multime', 'Multime', <BranchesOutlined />, [
    getItem(<Link to={PATH_AUTH.signin}>content </Link>, 'contentMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>report </Link>, 'reportMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>news </Link>, 'newsMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>matching business </Link>, 'matchingBusinessMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>order </Link>, 'orderMultimeMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>countries </Link>, 'countriesMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>marketing </Link>, 'marketingMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>fraud</Link>, 'fraudMultime', null),
    getItem(<Link to={PATH_AUTH.signin}>policy</Link>, 'policy', null),
    getItem(<Link to={PATH_AUTH.signin}>users</Link>, 'users', null),
    getItem(<Link to={PATH_AUTH.signin}>Marketing to Acquire Users </Link>, 'marketingToAcquireUsers', null),
  ]),
];

const rootSubmenuKeys = ['dashboards', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="blue"
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: '1rem 0' }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: COLOR['100'],
              itemHoverBg: COLOR['50'],
              itemSelectedColor: COLOR['600'],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: 'none' }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
