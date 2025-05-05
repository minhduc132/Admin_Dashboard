import { AppLayout } from '../index.ts';
import { Button, Col, Row, Typography } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  BlogsListCard,
  Card,
  PageHeader,
  SocialMediaCard,
} from '../../components';
import { HomeOutlined, IdcardOutlined } from '@ant-design/icons';
import { CORPORATE_ITEMS } from '../../constants';
import { useStylesContext } from '../../context';
import { Blog } from '../../types/blogs';


const { Text, Title } = Typography;
const BLOGS_DATA: Blog[] = [
  {
    id: '1',
    title: 'Sample blog',
    content: 'This is a sample blog content.',
    userId: '1',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['react', 'typescript'],
    coverImage: 'https://via.placeholder.com/300',
    comments: [],
    likes: 0,
  },
];



export const CorporateLayout = () => {
  const { pathname } = useLocation();
  const stylesContext = useStylesContext();

  return (
    <>
      {/*@ts-ignore*/}
      <AppLayout>
        <PageHeader
          title="corporate"
          breadcrumbs={[
            {
              title: (
                <>
                  <HomeOutlined />
                  <span>home</span>
                </>
              ),
              path: '/',
            },
            {
              title: (
                <>
                  <IdcardOutlined />
                  <span>corporate</span>
                </>
              ),
              menu: {
                items: CORPORATE_ITEMS.map((d) => ({
                  key: d.title,
                  title: <Link to={d.path}>{d.title}</Link>,
                })),
              },
            },
            {
              title: pathname.split('/')[pathname.split('/').length - 1] || '',
            },
          ]}
        />
        <Row {...stylesContext?.rowProps}>
          <Col xs={24} md={16} xl={18}>
            <Outlet />
          </Col>
          <Col xs={24} md={8} xl={6}>
            <Row {...stylesContext?.rowProps}>
              <Col span={24}>
                <Card title="Careers" actions={[<Button>Explore more</Button>]}>
                  <Text>
                    Tortor id aliquet lectus proin nibh nisl condimentum. Semper
                    quis lectus nulla at volutpat. Faucibus nisl tincidunt eget
                    nullam non. Malesuada nunc vel risus commodo viverra. Lectus
                    vestibulum mattis ullamcorper velit sed ullamcorper morbi
                    tincidunt ornare.
                  </Text>
                  <Title level={5}>Requirements</Title>
                  <ul>
                    <li>Experience with JavaScript</li>
                    <li>Good time-management skills</li>
                    <li>Experience with React & Nextjs</li>
                    <li>Experience with HTML / CSS</li>
                  </ul>
                  <Title level={5}>Our Achievements</Title>
                  <ul>
                    <li>ISO Certified</li>
                    <li>Atlassian Partner</li>
                    <li>Amazon Partner</li>
                    <li>Google Partner</li>
                    <li>Microsoft Partner</li>
                  </ul>
                </Card>
              </Col>
              <Col span={24}>
                <BlogsListCard
                  data={BLOGS_DATA}
                  onEdit={(blog) => console.log('Edit blog', blog)}
                  onDelete={(blogId) => console.log('Delete blog', blogId)}
                  onLike={(blogId) => console.log('Like blog', blogId)}
                  onComment={(blogId, comment) => console.log('Comment on blog', blogId, comment)}
                />

              </Col>
              <Col span={24}>
                <SocialMediaCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};
