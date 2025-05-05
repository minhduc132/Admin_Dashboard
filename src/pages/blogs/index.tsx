import {
    Button,
    Col,
    Row,
    Space,
} from 'antd';
import {
    HomeOutlined,
    PieChartOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Card, PageHeader, BlogsListCard } from '../../components';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { Blog } from '../../types/blogs';
import AddBlogModal from '../../components/Blogs/AddBlogModal';
import EditBlogModal from '../../components/Blogs/EditBlogModal';

import { User } from '../../types/authService';

const BLOG_TABS = [
    { key: 'all', label: 'All Blogs' },
    { key: 'draft', label: 'Draft' },
    { key: 'published', label: 'Published' },
    { key: 'pendingApproval', label: 'Pending Approval' },
];

export const BlogsDashboardPage = () => {
    // State cho modal thêm blog
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    // State cho modal chỉnh sửa blog
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [blogList, setBlogList] = useState<Blog[]>([]);
    const [blogTabsKey, setBlogTabKey] = useState<string>('all');
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const {
        data: blogsData,
        error: blogsDataError,
        loading: blogsDataLoading,
    } = useFetchData('/Blogs.json');

    // Hàm mở modal chỉnh sửa: chỉ cần thiết lập blog được chọn và mở modal edit
    const handleEdit = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsEditModalOpen(true);
    };

    // Hàm cập nhật blog sau khi chỉnh sửa thành công
    const handleUpdateBlog = (updatedBlog: Blog) => {
        const updatedList = blogList.map((b) =>
            b.id === updatedBlog.id ? updatedBlog : b
        );
        setBlogList(updatedList);
        localStorage.setItem('blogList', JSON.stringify(updatedList));
        // Đóng modal và xóa blog đang chọn
        setSelectedBlog(null);
        setIsEditModalOpen(false);
        console.log('Updated blog:', updatedBlog);
    };

    const handleDelete = (id: string) => {
        const updatedList = blogList.filter((blog) => blog.id !== id);
        setBlogList(updatedList);
        localStorage.setItem('blogList', JSON.stringify(updatedList));
        console.log('Deleted blog with id:', id);
    };

    const handleLike = (id: string) => {
        const updatedList = blogList.map((blog) =>
            blog.id === id ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
        );
        setBlogList(updatedList);
        localStorage.setItem('blogList', JSON.stringify(updatedList));
    };

    const handleComment = (blogId: string, content: string, user: User) => {
        const newComment = {
            id: Date.now().toString(),
            content,
            createdAt: new Date().toISOString(),
            author: user,
        };

        const updatedList = blogList.map((blog) =>
            blog.id === blogId
                ? {
                    ...blog,
                    comments: [...(blog.comments ?? []), newComment],
                }
                : blog
        );

        setBlogList(updatedList);
        localStorage.setItem('blogList', JSON.stringify(updatedList));
    };

    // Các hàm để mở, đóng modal thêm blog
    const showAddModal = () => setIsAddModalOpen(true);
    const handleAddModalCancel = () => setIsAddModalOpen(false);

    // Hàm xử lý khi thêm blog mới
    const handleAddBlog = (newBlog: Blog) => {
        const updatedList = [newBlog, ...blogList];
        setBlogList(updatedList);
        localStorage.setItem('blogList', JSON.stringify(updatedList));
    };

    useEffect(() => {
        const savedList = localStorage.getItem('blogList');

        if (savedList) {
            setBlogList(JSON.parse(savedList));
        } else if (blogsData) {
            setBlogList(blogsData);
            localStorage.setItem('blogList', JSON.stringify(blogsData));
        } else if (blogsDataError) {
            console.error('Error fetching Blogs.json:', blogsDataError);
            const defaultBlogList: Blog[] = [
                {
                    id: '1',
                    title: 'Sample Blog',
                    content: 'This is a sample blog content.',
                    userId: '',
                    status: 'draft',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ['sample'],
                    coverImage: '',
                    comments: [],
                    likes: 0,
                },
            ];
            setBlogList(defaultBlogList);
            localStorage.setItem('blogList', JSON.stringify(defaultBlogList));
        }
    }, [blogsData, blogsDataError]);

    const BLOG_TABS_CONTENT: Record<string, React.ReactNode> = {
        all: (
            <BlogsListCard
                key="all"
                data={blogList}
                onEdit={handleEdit} // Khi nhấn edit, gọi handleEdit để mở modal edit
                onDelete={handleDelete}
                onLike={handleLike}
                onComment={(id, content, user) => handleComment(id, content, user)}
            />
        ),
        draft: (
            <BlogsListCard
                key="draft"
                data={blogList.filter((b) => b.status === 'draft')}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
                onComment={(id, content, user) => handleComment(id, content, user)}
            />
        ),
        published: (
            <BlogsListCard
                key="published"
                data={blogList.filter((b) => b.status === 'published')}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
                onComment={(id, content, user) => handleComment(id, content, user)}
            />
        ),
        pendingApproval: (
            <BlogsListCard
                key="pendingApproval"
                data={blogList.filter((b) => b.status === 'pendingApproval')}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
                onComment={(id, content, user) => handleComment(id, content, user)}
            />
        ),
    };

    return (
        <div>
            <Helmet>
                <title>Blog Dashboard</title>
            </Helmet>

            <PageHeader
                title="Blogs Dashboard"
                breadcrumbs={[
                    { title: <><HomeOutlined /><span>Home</span></> },
                    { title: <><PieChartOutlined /><span>Dashboards</span></> },
                    { title: 'Blogs' },
                ]}
            />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Blogs"
                        extra={
                            <Space>
                                <Button icon={<PlusOutlined />} onClick={showAddModal}>
                                    New Blog
                                </Button>
                            </Space>
                        }
                        tabList={BLOG_TABS}
                        activeTabKey={blogTabsKey}
                        onTabChange={setBlogTabKey}
                    >
                        {BLOG_TABS_CONTENT[blogTabsKey]}
                    </Card>
                    <AddBlogModal
                        open={isAddModalOpen}
                        onOk={() => setIsAddModalOpen(false)}
                        onCancel={handleAddModalCancel}
                        onAddBlog={handleAddBlog}
                    />
                    {selectedBlog && (
                        <EditBlogModal
                            open={isEditModalOpen}
                            onOk={() => setIsEditModalOpen(false)}
                            onCancel={() => setIsEditModalOpen(false)}
                            onEditBlog={handleUpdateBlog}
                            blog={selectedBlog} // Pass blog cần cập nhật
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};
