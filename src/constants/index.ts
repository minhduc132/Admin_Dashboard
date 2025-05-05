import {
  PATH_CALENDAR,
  PATH_INBOX,
  PATH_SHOP,
  PATH_MULTIME,
  PATH_NETWORK,
  PATH_AUTH,
  PATH_BLOG,
  PATH_CAREERS,
  PATH_CHANGELOG,
  PATH_CONTACTS,
  PATH_CORPORATE,
  PATH_DASHBOARD,
  PATH_DOCS,
  PATH_FILE,
  PATH_GITHUB,
  PATH_INVOICE,
  PATH_LAYOUT,
  PATH_START,
  PATH_SUBSCRIPTION,
  PATH_USER_MGMT,
  PATH_USER_PROFILE,
  PATH_LANDING,
  PATH_SOCIALS,
} from './routes.ts';

const DASHBOARD_ITEMS = [
  { title: 'user', path: PATH_DASHBOARD.user },
  { title: 'blog', path: PATH_DASHBOARD.blog },
  { title: 'referral', path: PATH_DASHBOARD.ref },
];

const CORPORATE_ITEMS = [
  { title: 'about', path: PATH_CORPORATE.about },
  { title: 'team', path: PATH_CORPORATE.team },
  { title: 'faq', path: PATH_CORPORATE.faqs },
  { title: 'contact us', path: PATH_CORPORATE.contact },
  { title: 'pricing', path: PATH_CORPORATE.pricing },
  { title: 'license', path: PATH_CORPORATE.license },
];

const USER_PROFILE_ITEMS = [
  { title: 'details', path: PATH_USER_PROFILE.details },
  { title: 'preferences', path: PATH_USER_PROFILE.preferences },
  { title: 'information', path: PATH_USER_PROFILE.personalInformation },
  { title: 'security', path: PATH_USER_PROFILE.security },
  { title: 'activity', path: PATH_USER_PROFILE.activity },
  { title: 'actions', path: PATH_USER_PROFILE.action },
  { title: 'help', path: PATH_USER_PROFILE.help },
  { title: 'feedback', path: PATH_USER_PROFILE.feedback },
];

const AUTHENTICATION_ITEMS = [
  { title: 'sign in', path: PATH_AUTH.signin },
  { title: 'sign up', path: PATH_AUTH.signup },
  { title: 'welcome', path: PATH_AUTH.welcome },
  { title: 'password reset', path: PATH_AUTH.passwordReset }
];

export {
  PATH_CALENDAR,
  PATH_USER_MGMT,
  PATH_INBOX,
  PATH_LAYOUT,
  PATH_CORPORATE,
  PATH_CONTACTS,
  PATH_DASHBOARD,
  PATH_CHANGELOG,
  PATH_CAREERS,
  PATH_NETWORK,
  PATH_SHOP,
  PATH_MULTIME,
  PATH_GITHUB,
  PATH_AUTH,
  PATH_INVOICE,
  PATH_BLOG,
  PATH_DOCS,
  PATH_SUBSCRIPTION,
  PATH_USER_PROFILE,
  PATH_FILE,
  PATH_START,
  PATH_LANDING,
  DASHBOARD_ITEMS,
  CORPORATE_ITEMS,
  USER_PROFILE_ITEMS,
  PATH_SOCIALS,
  AUTHENTICATION_ITEMS,
};
