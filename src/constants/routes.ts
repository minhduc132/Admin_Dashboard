function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_LANDING = '/';
const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_LAYOUT = '/layouts';
const ROOTS_CORPORATE = '/corporate';
const ROOTS_PROFILE = '/user-profile';
const ROOTS_BLOG = '/blog';
const ROOTS_CAREERS = '/careers';
const ROOTS_SHOP = '/shop';
const ROOTS_SERVIVCE = '/service';
const ROOTS_AUTH = '/auth';
const ROOTS_MULTIME = '/multime';
const ROOTS_CONTACTS = '/contacts';
const ROOTS_USER_MGMT = '/user-management';
const ROOTS_SUBSCRIPTION = '/subscription';
const ROOTS_INVOICE = '/invoice';
const ROOTS_FILE_MGMT = '/file-manager';
const ROOTS_INBOX = '/inbox';
const ROOTS_CALENDAR = '/calendar';

export const PATH_LANDING = {
  root: ROOTS_LANDING,
  why: '/why-us',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: path(ROOTS_DASHBOARD, '/user'),
  ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  marketing: path(ROOTS_DASHBOARD, '/marketing'),
  ref: path(ROOTS_DASHBOARD, '/ref'),
  blog: path(ROOTS_DASHBOARD, '/blog'),
  faq: path(ROOTS_DASHBOARD, '/faq'),
  report: path(ROOTS_DASHBOARD, '/report'),
  social: path(ROOTS_DASHBOARD, '/social'),
};

export const PATH_LAYOUT = {
  root: ROOTS_LAYOUT,
  sidebar: {
    light: path(ROOTS_LAYOUT, '/sidebar/light'),
    dark: path(ROOTS_LAYOUT, '/sidebar/dark'),
    minimized: path(ROOTS_LAYOUT, '/sidebar/minimized'),
  },
  header: {
    light: path(ROOTS_LAYOUT, '/header/light'),
    dark: path(ROOTS_LAYOUT, '/header/dark'),
    overlay: path(ROOTS_LAYOUT, '/header/overlay'),
  },
};

export const PATH_CORPORATE = {
  root: ROOTS_CORPORATE,
  about: path(ROOTS_CORPORATE, '/about'),
  team: path(ROOTS_CORPORATE, '/team'),
  faqs: path(ROOTS_CORPORATE, '/faqs'),
  contact: path(ROOTS_CORPORATE, '/contact'),
  pricing: path(ROOTS_CORPORATE, '/pricing'),
  license: path(ROOTS_CORPORATE, '/license'),
};

export const PATH_USER_PROFILE = {
  root: ROOTS_PROFILE,
  details: path(ROOTS_PROFILE, '/details'),
  preferences: path(ROOTS_PROFILE, '/preferences'),
  personalInformation: path(ROOTS_PROFILE, '/personal-information'),
  security: path(ROOTS_PROFILE, '/security'),
  activity: path(ROOTS_PROFILE, '/activity'),
  action: path(ROOTS_PROFILE, '/actions'),
  help: path(ROOTS_PROFILE, '/help'),
  feedback: path(ROOTS_PROFILE, '/feedback'),
};

export const PATH_BLOG = {
  root: ROOTS_BLOG,
  details: (id: string | number): string => path(ROOTS_BLOG, `/view/${id}`),
};

export const PATH_CAREERS = {
  root: ROOTS_CAREERS,
  new: path(ROOTS_CAREERS, `/new`),
};

export const PATH_SHOP = {
  root: ROOTS_SHOP,
  Product: path(ROOTS_SHOP, '/products'),
  Brand: path(ROOTS_SHOP, '/brands'),
  categories: path(ROOTS_SHOP, '/categories'),
  Affiliateprogram: path(ROOTS_SHOP, '/affiliateProgram'),
  Order: path(ROOTS_SHOP, '/orders'),
  SalesProducts: path(ROOTS_SHOP, '/salesProducts'),
  Fraud: path(ROOTS_SHOP, '/fraud'),
  Subcription: path(ROOTS_SHOP, '/subcription'),
  Supplier: path(ROOTS_SHOP, '/Supplier'),
  Pricing: path(ROOTS_SHOP, '/pricing'),
  Combo: path(ROOTS_SHOP, '/combo'),
  Booking: path(ROOTS_SHOP, '/booking'),

};

export const PATH_NETWORK = {
  root: ROOTS_SERVIVCE,
  Overview: path(ROOTS_SERVIVCE, '/Overview'),
  Listings: path(ROOTS_SERVIVCE, '/Listings'),
  User: path(ROOTS_SERVIVCE, '/User '),
  Category: path(ROOTS_SERVIVCE, '/Category'),
  Blog: path(ROOTS_SERVIVCE, '/Blog'),
  Review: path(ROOTS_SERVIVCE, '/Review'),
  Rating: path(ROOTS_SERVIVCE, '/Rating'),
  Marketing: path(ROOTS_SERVIVCE, '/Marketing'),
  Request: path(ROOTS_SERVIVCE, '/Request'),
  BrandingAndPolicy: path(ROOTS_SERVIVCE, '/BrandingAndPolicy'),
  Businesss: path(ROOTS_SERVIVCE, '/BusinesssLegal'),
  Order: path(ROOTS_SERVIVCE, '/Order'),
  Fraud: path(ROOTS_SERVIVCE, '/Fraud'),
  Email: path(ROOTS_SERVIVCE, '/Email'),
  Affiliate: path(ROOTS_SERVIVCE, '/Affiliate'),
  Organization: path(ROOTS_SERVIVCE, '/Organization'),
  Sales: path(ROOTS_SERVIVCE, '/Sales'),
  Promote: path(ROOTS_SERVIVCE, '/Promote '),
};

export const PATH_MULTIME = {
  root: ROOTS_MULTIME,
  content: path(ROOTS_MULTIME, '/content'),
  report: path(ROOTS_MULTIME, '/report'),
  news: path(ROOTS_MULTIME, '/news'),
  matchingBusiness: path(ROOTS_MULTIME, '/matchingBusiness'),
  order: path(ROOTS_MULTIME, '/order'),
  countries: path(ROOTS_MULTIME, '/countries'),
  marketingMulti: path(ROOTS_MULTIME, '/marketing'),
  fraud: path(ROOTS_MULTIME, '/fraud'),
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
  passwordConfirm: path(ROOTS_AUTH, '/password-confirmation'),
  welcome: path(ROOTS_AUTH, '/welcome'),
  verifyEmail: path(ROOTS_AUTH, '/verify-email'),
  accountDelete: path(ROOTS_AUTH, '/account-delete'),
};

export const PATH_CONTACTS = {
  root: ROOTS_CONTACTS,
  details: (id: string | number): string => path(ROOTS_CONTACTS, `/view/${id}`),
  new: path(ROOTS_CONTACTS, '/new'),
  editDetails: (id: string | number): string =>
    path(ROOTS_CONTACTS, `/edit/${id}`),
};

export const PATH_USER_MGMT = {
  root: ROOTS_USER_MGMT,
  users: {
    all: path(ROOTS_USER_MGMT, '/users'),
    details: (id: string | number): string =>
      path(ROOTS_USER_MGMT, `/view/${id}`),
  },
  roles: {
    all: path(ROOTS_USER_MGMT, '/roles'),
    details: (id: string | number): string =>
      path(ROOTS_USER_MGMT, `/roles/view/${id}`),
  },
  permissions: path(ROOTS_USER_MGMT, '/permissions'),
};

export const PATH_INVOICE = {
  root: ROOTS_INVOICE,
  new: path(ROOTS_INVOICE, `/new`),
  details: (id: string | number): string =>
    path(ROOTS_USER_MGMT, `/view/${id}`),
};

export const PATH_FILE = {
  root: ROOTS_FILE_MGMT,
  files: path(ROOTS_FILE_MGMT, `/files`),
  blank: path(ROOTS_FILE_MGMT, `/blank`),
};

export const PATH_INBOX = {
  root: ROOTS_INBOX,
  new: path(ROOTS_INBOX, `/new`),
  details: (id: string | number): string => path(ROOTS_INBOX, `/view/${id}`),
  blank: path(ROOTS_INBOX, `/blank`),
};

export const PATH_CALENDAR = {
  root: ROOTS_CALENDAR,
};

export const PATH_SUBSCRIPTION = {
  root: ROOTS_SUBSCRIPTION,
  list: path(ROOTS_SUBSCRIPTION, `/list`),
  new: path(ROOTS_SUBSCRIPTION, `/new`),
  details: (id: string | number): string =>
    path(ROOTS_SUBSCRIPTION, `/view/${id}`),
};

export const PATH_START = {
  root: 'https://mantine-analytics-dashboard-docs.netlify.app/getting-started',
};

export const PATH_DOCS = {
  help: 'https://github.com/design-sparx/antd-multipurpose-dashboard/blob/main/README.md',
  components: 'https://6546507b657a74164abf2db6-oniqlpqtfs.chromatic.com/',
  productRoadmap:
    'https://kelvink96.notion.site/1af2c000eb4f4b1688684cb2d88d5ee4?v=eb14f3050b7d4357821dbcb4bb61b636&p=752cacbf390f4d1cbc0e625550391d9b&pm=s',
};

export const PATH_CHANGELOG = {
  root: '',
};

export const PATH_GITHUB = {
  org: 'https://github.com/design-sparx',
  personal: 'https://github.com/kelvink96',
  repo: 'https://github.com/design-sparx/antd-multipurpose-dashboard',
};

export const PATH_SOCIALS = {
  behance: 'https://www.behance.net/kelvink96',
  dribbble: 'https://dribbble.com/kelvink96',
  facebook: 'https://www.facebook.com/kelvinkk96',
  instagram: 'https://www.instagram.com/kelvink_96/',
  linkedin: 'https://www.linkedin.com/in/kelvink96/',
  youtube: 'https://twitter.com/kelvink_96',
};

