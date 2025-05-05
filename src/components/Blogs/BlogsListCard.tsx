import React, { ReactNode, useState } from 'react';
import { Alert, Button, List, Space, Typography, Tag, Input, Divider, message } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Blog, Comment } from '../../types/blogs';
import './styles.css';
import { getCurrentUser, getUserById } from '../../types/authService';

const IconText = ({ icon, text }: { icon: React.ElementType; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

type Props = {
  data: Blog[];
  loading?: boolean;
  error?: ReactNode;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string, content: string, user: Comment['author']) => void;
};

export const BlogsListCard = ({
  data,
  loading,
  error,
  onEdit,
  onDelete,
  onLike,
  onComment,
}: Props) => {
  const [openCommentIds, setOpenCommentIds] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedBlogIds, setExpandedBlogIds] = useState<string[]>([]); // Lưu trạng thái "Xem thêm"

  const toggleCommentSection = (id: string) => {
    setOpenCommentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCommentSubmit = (blogId: string) => {
    const content = commentInputs[blogId]?.trim();
    const currentUser = getCurrentUser();

    if (!currentUser) {
      message.warning('You must be logged in to comment.');
      return;
    }

    if (!content) {
      message.error('Comment content cannot be left blank.');
      return;
    }

    onComment(blogId, content, currentUser);
    setCommentInputs((prev) => ({ ...prev, [blogId]: '' }));
  };

  // Giới hạn số ký tự hiển thị trong content
  const truncateContent = (content: string, limit: number) => {
    return content.length > limit ? content.slice(0, limit) + '...' : content;
  };

  return (
    <div className="blogs-list-card">
      {error ? (
        <Alert message="Error" description={error.toString()} type="error" showIcon />
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => console.log(page),
            pageSize: 3,
            align: 'center',
          }}
          dataSource={data}
          loading={loading}
          renderItem={(item: Blog) => (
            <List.Item
              key={item.id}
              actions={[
                <div onClick={() => onLike(item.id)} style={{ cursor: 'pointer' }}>
                  <IconText icon={LikeOutlined} text={String(item.likes || 0)} key="like" />
                </div>,
                <div onClick={() => toggleCommentSection(item.id)} style={{ cursor: 'pointer' }}>
                  <IconText icon={MessageOutlined} text={String(item.comments?.length || 0)} key="comment" />
                </div>,
                <Button type="link" onClick={() => onEdit(item)}>
                  Edit
                </Button>,
                <Button type="link" danger onClick={() => onDelete(item.id)}>
                  Delete
                </Button>,
              ]}
            >
              <Typography.Title level={5} className="m-0">
                {item.title}
              </Typography.Title>

              {/* Hiển thị content đã cắt ngắn với giới hạn ký tự */}
              <Typography.Paragraph className="m-0">
                {expandedBlogIds.includes(item.id)
                  ? item.content
                  : truncateContent(item.content, 80)}
              </Typography.Paragraph>

              {/* Hiển thị nút "Xem thêm" nếu content dài hơn 100 ký tự */}
              {item.content.length > 80 && (
                <Button
                  type="link"
                  onClick={() => {
                    setExpandedBlogIds((prev) =>
                      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                    );
                  }}
                >
                  {expandedBlogIds.includes(item.id) ? 'Thu gọn' : 'Xem thêm'}
                </Button>
              )}

              <Typography.Text type="secondary">
                {(() => {
                  const user = getUserById(item.userId);
                  return user
                    ? `Author: ${user.firstName} ${user.lastName} | ${user.email}`
                    : 'Author: Unknown';
                })()}
              </Typography.Text>

              <div style={{ marginTop: 8 }}>
                {item.status === 'published' && <Tag color="green">Published</Tag>}
                {item.status === 'draft' && <Tag color="orange">Draft</Tag>}
                {item.status === 'pendingApproval' && <Tag color="blue">Pending Approval</Tag>}
              </div>

              {openCommentIds.includes(item.id) && (
                <div style={{ marginTop: 16 }}>
                  <Divider>Comments</Divider>
                  {item.comments?.map((comment: Comment) => (
                    <div key={comment.id} style={{ marginBottom: 8 }}>
                      <Typography.Text strong>
                        {comment.author
                          ? `${comment.author.firstName} ${comment.author.lastName}`
                          : 'Unknown User'}
                      </Typography.Text>
                      <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </Typography.Text>
                      <div>{comment.content}</div>
                    </div>
                  ))}

                  <Input.TextArea
                    value={commentInputs[item.id] || ''}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    placeholder="Write a comment..."
                    rows={2}
                    style={{ marginTop: 8 }}
                  />
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleCommentSubmit(item.id)}
                    style={{ marginTop: 8 }}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
