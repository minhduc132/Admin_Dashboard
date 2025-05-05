import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { Card, PageHeader } from '../../components';
import { HomeOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { SocialMediaPost, Platform } from '../../types/socialmediapost ';
import SocialMediaTab from '../../components/SocialMediaPost/SocialMediaTable';
import AddSocialMediaModal from '../../components/SocialMediaPost/AddSocialMediaPostModal';
// import EditSocialMediaModal from '../../components/SocialMedia/EditSocialMediaModal';

const SOCIAL_MEDIA_TABS = [
    { key: 'all', label: 'All Posts' },
];

export const SocialMediaDashboardPage: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<SocialMediaPost | null>(null);
    const [socialMediaList, setSocialMediaList] = useState<SocialMediaPost[]>([]);
    const [activeTabKey, setActiveTabKey] = useState<string>('all');
    const platforms: Platform[] = [
        { name: 'Facebook', url: 'https://www.facebook.com' },
        { name: 'Twitter', url: 'https://www.twitter.com' },
        { name: 'Instagram', url: 'https://www.instagram.com' },
    ];
    const { data: socialMediaData, error: socialMediaDataError } = useFetchData('/SocialMediaPosts.json');

    const showAddModal = () => setIsAddModalOpen(true);
    const handleAddModalCancel = () => setIsAddModalOpen(false);

    const handleEdit = (post: SocialMediaPost) => {
        setCurrentPost(post);
        setIsEditModalOpen(true);
    };
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
        setCurrentPost(null);
    };

    const handleAddPost = (newPost: SocialMediaPost) => {
        const updatedList = [newPost, ...socialMediaList];
        setSocialMediaList(updatedList);
        localStorage.setItem('socialMediaList', JSON.stringify(updatedList));
    };

    const handleUpdatePost = (updatedPost: SocialMediaPost) => {
        const updatedList = socialMediaList.map(p => (p.id === updatedPost.id ? updatedPost : p));
        setSocialMediaList(updatedList);
        localStorage.setItem('socialMediaList', JSON.stringify(updatedList));
        handleEditModalCancel();
    };

    useEffect(() => {
        const savedList = localStorage.getItem('socialMediaList');
        if (savedList) {
            setSocialMediaList(JSON.parse(savedList));
        } else if (socialMediaData) {
            setSocialMediaList(socialMediaData);
            localStorage.setItem('socialMediaList', JSON.stringify(socialMediaData));
        } else if (socialMediaDataError) {
            console.error('Error fetching social media data:', socialMediaDataError);
            setSocialMediaList([]);
            localStorage.setItem('socialMediaList', JSON.stringify([]));
        }
    }, [socialMediaData, socialMediaDataError]);

    const TAB_CONTENT: Record<string, React.ReactNode> = {
        all: (
            <SocialMediaTab data={socialMediaList} onEdit={handleEdit} />
        ),
    };

    return (
        <div>
            <Helmet>
                <title>Social Media Dashboard</title>
            </Helmet>

            <PageHeader
                title="Social Media Dashboard"
                breadcrumbs={[
                    { title: <><HomeOutlined /><span>Home</span></> },
                    { title: <><PieChartOutlined /><span>Dashboard</span></> },
                    { title: 'Social Media Posts' },
                ]}
            />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Social Media Posts"
                        extra={
                            <Space>
                                <Button icon={<PlusOutlined />} onClick={showAddModal}>
                                    New Post
                                </Button>
                            </Space>
                        }
                        tabList={SOCIAL_MEDIA_TABS}
                        activeTabKey={activeTabKey}
                        onTabChange={(key) => setActiveTabKey(key)}
                    >
                        {TAB_CONTENT[activeTabKey]}
                    </Card>
                </Col>
            </Row>

            <AddSocialMediaModal
                open={isAddModalOpen}
                onOk={() => setIsAddModalOpen(false)}
                onCancel={handleAddModalCancel}
                onAddPost={handleAddPost}
                platforms={platforms}
            />

            {/* <EditSocialMediaModal
                open={isEditModalOpen}
                post={currentPost}
                onCancel={handleEditModalCancel}
                onOk={handleUpdatePost}
            /> */}
        </div>
    );
};
