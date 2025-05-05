import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleOutlined, FacebookFilled, TwitterOutlined } from '@ant-design/icons';
import { Logo } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { PATH_AUTH } from '../../constants';

const { Title, Text, Link } = Typography;

type FieldType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cPassword: string;
  terms: boolean;
};

const generateId = (): string => {
  return 'user-' + Math.random().toString(36).substr(2, 9);
};

const isEmailTaken = (email: string): boolean => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.some((user: any) => user.email === email);
};

const saveUser = (user: { id: string, firstName: string, lastName: string, email: string, password: string, role: string }) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const SignUpPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: FieldType) => {
    const { firstName, lastName, email, password, cPassword, terms } = values;

    if (!terms) {
      message.error('Bạn cần đồng ý với điều khoản sử dụng.');
      return;
    }

    if (password !== cPassword) {
      message.error('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (isEmailTaken(email)) {
      message.error('Email đã tồn tại.');
      return;
    }

    setLoading(true);

    const id = generateId();  // Tạo ID cho người dùng

    // Lưu thông tin người dùng vào localStorage
    saveUser({ id, firstName, lastName, email, password, role: 'Buyer' });

    message.success('Success!');
    setTimeout(() => {
      navigate(PATH_AUTH.signin);
    }, 2000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row gutter={24} style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: '100%', padding: '1rem' }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Welcome back to Strongbody
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            A dynamic and versatile multipurpose dashboard utilizing Ant Design,

          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}  >
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Create an Account
          </Typography.Title>

          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24} lg={12} style={{

              }}>
                <Form.Item<FieldType>
                  label="First name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Confirm password"
                  name="cPassword"
                  rules={[{ required: true, message: 'Please ensure passwords match!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="terms" valuePropName="checked">
                  <Flex>
                    <Checkbox>I agree to</Checkbox>
                    <Link>terms and conditions</Link>
                  </Flex>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Divider className="m-0">or</Divider>
          <Flex
            vertical={isMobile}
            gap="small"
            wrap="wrap"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button icon={<GoogleOutlined />}>Sign up with Google</Button>
            <Button icon={<FacebookFilled />}>Sign up with Facebook</Button>
            <Button icon={<TwitterOutlined />}>Sign up with Twitter</Button>
          </Flex>
          <Form.Item<FieldType> name="terms" valuePropName="checked">
            <Flex style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
              <span>Don't have an account?</span>
              <Link>Sign Up</Link>
            </Flex>
          </Form.Item>
        </div>
      </Col>
    </Row>
  );
};
