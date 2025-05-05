// src/components/AddSocialPostModal.tsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { SocialMediaPost, Platform } from '../../types/socialmediapost ';
import dayjs from 'dayjs';

// Giả sử có một hàm phân tích link (parse link) để trích xuất dữ liệu
const parseLink = (link: string) => {
    // Logic phân tích link ở đây, ví dụ:
    if (link.includes('facebook.com')) {
        return { platform: 'Facebook', content: 'This is a post from Facebook' };
    }
    if (link.includes('twitter.com')) {
        return { platform: 'Twitter', content: 'This is a post from Twitter' };
    }
    return { platform: '', content: '' };
};

interface AddSocialPostModalProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    onAddPost: (newPost: SocialMediaPost) => void;
    platforms: Platform[]; // Danh sách các nền tảng
}

const generateId = () => 'post_' + Math.random().toString(36).substr(2, 9);

const AddSocialPostModal: React.FC<AddSocialPostModalProps> = ({
    open,
    onOk,
    onCancel,
    onAddPost,
    platforms,
}) => {
    const [form] = Form.useForm();
    const [link, setLink] = useState<string>(''); // Trường link để nhập vào
    const [isParsing, setIsParsing] = useState<boolean>(false); // Trạng thái để biết đang phân tích hay không

    const handleLinkSubmit = () => {
        if (!link) {
            message.error('Please enter a valid link');
            return;
        }

        setIsParsing(true);

        // Phân tích link và cập nhật form
        const parsedData = parseLink(link);

        form.setFieldsValue({
            platform: parsedData.platform,
            content: parsedData.content,
            postDate: dayjs().toISOString(),
        });

        setIsParsing(false);
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const userId: string = JSON.parse(localStorage.getItem('user') || '{}')?.id || '';
            const newPost: SocialMediaPost = {
                id: generateId(),
                userId: userId,
                platform: values.platform,
                content: values.content,
                postDate: dayjs(values.postDate).toISOString(),
                sourceUrl: values.sourceUrl || '',
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
            };
            onAddPost(newPost);
            form.resetFields();
            onOk();
        });
    };

    return (
        <Modal
            title="Add New Social Media Post"
            open={open}
            onOk={handleSubmit}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="link"
                    label="Social Media Link"
                    rules={[{ required: true, message: 'Please enter the post link!' }]}
                >
                    <Input
                        placeholder="Enter post link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </Form.Item>

                <Button type="primary" onClick={handleLinkSubmit} loading={isParsing}>
                    Parse Link
                </Button>

                <Form.Item
                    name="platform"
                    label="Platform"
                    rules={[{ required: true, message: 'Please select a platform!' }]}
                >
                    <Select placeholder="Select platform">
                        {platforms.map((platform) => (
                            <Select.Option key={platform.name} value={platform.name}>
                                {platform.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true, message: 'Please input the content!' }]}
                >
                    <Input.TextArea placeholder="Enter post content" />
                </Form.Item>

                <Form.Item name="postDate" label="Post Date">
                    <Input type="datetime-local" />
                </Form.Item>

                <Form.Item name="sourceUrl" label="Source URL (optional)">
                    <Input placeholder="Enter source URL (optional)" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddSocialPostModal;
