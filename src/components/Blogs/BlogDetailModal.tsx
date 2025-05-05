import React from 'react';
import { Modal, Descriptions, Tag, Image, Space, Typography, List } from 'antd';
import { Blog, Comment } from '../../types/blogs';
import { User } from '../../types/authService';

type Props = {
    open: boolean;
    onClose: () => void;
    blog: Blog | null;
    users: User[];  // Danh sách người dùng
};

const BlogDetailModal: React.FC<Props> = ({ open, onClose, blog, users }) => {
    if (!blog) return null;

    // Tìm tên tác giả từ userId
    const author = users.find(user => user.id === blog.userId);
    const authorName = author ? `${author.firstName} ${author.lastName}` : 'N/A';

    // Tạo màu sắc cho trạng thái
    const statusColor = {
        draft: 'orange',
        published: 'green',
        pendingApproval: 'blue',
    }[blog.status];

    return (
        <Modal
            open={open}
            title="Blog Details"
            onCancel={onClose}
            footer={null}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Title">{blog.title}</Descriptions.Item>
                <Descriptions.Item label="Author">{authorName}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Tag color={statusColor}>{blog.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Tags">
                    {blog.tags && blog.tags.length > 0 ? blog.tags.map(tag => <Tag key={tag}>{tag}</Tag>) : 'No Tags'}
                </Descriptions.Item>
                <Descriptions.Item label="Likes">{blog.likes || 0}</Descriptions.Item>
                <Descriptions.Item label="Content">
                    <div>{blog.content}</div>
                </Descriptions.Item>
                <Descriptions.Item label="Created At">{blog.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{blog.updatedAt}</Descriptions.Item>
            </Descriptions>

            <Space direction="vertical" style={{ width: '100%' }}>
                <Typography.Title level={5}>Comments</Typography.Title>
                <List
                    bordered
                    dataSource={blog.comments}
                    renderItem={(comment: Comment) => (
                        <List.Item key={comment.id}>
                            <Typography.Text strong>{comment.author.firstName} {comment.author.lastName}:</Typography.Text>
                            <Typography.Text>{comment.content}</Typography.Text>
                            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                {comment.createdAt}
                            </Typography.Text>
                        </List.Item>
                    )}
                />
            </Space>
        </Modal>
    );
};

export default BlogDetailModal;
