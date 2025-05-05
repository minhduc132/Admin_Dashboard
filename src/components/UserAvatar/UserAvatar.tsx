import { Avatar, AvatarProps, Flex, FlexProps, theme, Typography } from 'antd';
import { colourNameToHex, getNameInitials, isColorLight } from '../../utils';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { CSSProperties } from 'react';
import { Upload } from 'antd'; // Import Upload component
import { RcFile } from 'antd/es/upload/interface'; // Đảm bảo type đúng

type Props = {
  fullName: string;
  mark?: boolean;
  size?: 'small' | 'middle' | 'large';
  verified?: boolean;
  color?: CSSProperties['color'];
  textWidth?: CSSProperties['width'];
  onAvatarChange?: (url: string) => void; // Callback để cập nhật avatar
} & Omit<FlexProps, 'children'>;

export const UserAvatar = ({
  fullName,
  mark,
  size,
  verified,
  color,
  textWidth,
  onAvatarChange,
  ...others
}: Props) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const avatarProps: AvatarProps = {
    size: size === 'large' ? 36 : size === 'small' ? 18 : 24,
  };

  // Cập nhật avatar khi người dùng nhấn vào
  const handleAvatarChange = (file: RcFile) => {
    // Gọi callback để cập nhật URL của ảnh
    if (onAvatarChange) {
      onAvatarChange(URL.createObjectURL(file));
    }
  };

  return (
    <Flex gap="small" align="center" {...others}>
      {mark ? (
        <Avatar
          style={{
            backgroundColor: color || colorPrimary,
            color: isColorLight(colourNameToHex(color || colorPrimary))
              ? 'black'
              : 'white',
          }}
          icon={<UserOutlined />}
          {...avatarProps}
        />
      ) : (
        <Avatar
          style={{
            backgroundColor: color || colorPrimary,
            color: isColorLight(colourNameToHex(color || colorPrimary))
              ? 'black'
              : 'white',
          }}
          {...avatarProps}
        >
          {getNameInitials(fullName)}
        </Avatar>
      )}

      <Typography.Text
        style={{
          fontSize: size === 'large' ? 18 : size === 'small' ? 14 : 16,
          width: textWidth || 160,
        }}
      >
        {fullName}
      </Typography.Text>

      {verified && (
        <CheckCircleFilled style={{ fontSize: 14, color: blue[6] }} />
      )}

      {/* Button upload avatar */}
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          handleAvatarChange(file as RcFile); // Gọi callback để xử lý
          return false; // Ngừng quá trình upload
        }}
        accept="image/*" // Chỉ cho phép ảnh
      >
        <Avatar
          style={{
            backgroundColor: color || colorPrimary,
            color: isColorLight(colourNameToHex(color || colorPrimary))
              ? 'black'
              : 'white',
          }}
          {...avatarProps}
          icon={<UserOutlined />} // Giữ icon người dùng mặc định
        />
      </Upload>
    </Flex>
  );
};
