import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { Card, PageHeader } from '../../components';
import { HomeOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { Refer } from '../../types/referral';
import RefTab from '../../components/Ref/RefTab';
import AddRefModal from '../../components/Ref/AddRefModal';
import EditRefModal from '../../components/Ref/EditRefModal';

const REFER_TABS = [
    { key: 'all', label: 'All Referrals' },
    // Có thể mở rộng thêm tab nếu cần (ví dụ: theo trạng thái online, offline, …)
];

export const ReferDashboardPage: React.FC = () => {
    // State modal riêng cho thêm và chỉnh sửa referral
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentRefer, setCurrentRefer] = useState<Refer | null>(null);
    const [referList, setReferList] = useState<Refer[]>([]);
    const [activeTabKey, setActiveTabKey] = useState<string>('all');

    // Giả sử dữ liệu được fetch từ '/Refer.json'
    const { data: referData, error: referDataError } = useFetchData('/Refer.json');

    // Mở modal thêm refer
    const showAddModal = () => setIsAddModalOpen(true);
    const handleAddModalCancel = () => setIsAddModalOpen(false);

    // Mở modal chỉnh sửa refer
    const handleEdit = (refer: Refer) => {
        setCurrentRefer(refer);  // Chỉnh sửa setCurrentRefer thay vì setSelectedRefer
        setIsEditModalOpen(true);
    };
    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
        setCurrentRefer(null);  // Reset currentRefer khi đóng modal
    };

    // Hàm xử lý khi thêm referral mới
    const handleAddRefer = (newRefer: Refer) => {
        const updatedList = [newRefer, ...referList];
        setReferList(updatedList);
        localStorage.setItem('referList', JSON.stringify(updatedList));
    };

    // Hàm cập nhật referral sau khi chỉnh sửa
    const handleUpdateRefer = (updatedRefer: Refer) => {
        const updatedList = referList.map(r => (r.id === updatedRefer.id ? updatedRefer : r));
        setReferList(updatedList);
        localStorage.setItem('referList', JSON.stringify(updatedList));
        handleEditModalCancel();
    };

    // Load dữ liệu từ localStorage hoặc fetch từ API
    useEffect(() => {
        const savedList = localStorage.getItem('referList');
        if (savedList) {
            setReferList(JSON.parse(savedList));
        } else if (referData) {
            setReferList(referData);
            localStorage.setItem('referList', JSON.stringify(referData));
        } else if (referDataError) {
            console.error('Error fetching refer data:', referDataError);
            setReferList([]);
            localStorage.setItem('referList', JSON.stringify([]));
        }
    }, [referData, referDataError]);

    const TAB_CONTENT: Record<string, React.ReactNode> = {
        all: (
            <RefTab data={referList} onEdit={handleEdit} />
        ),
    };

    return (
        <div>
            <Helmet>
                <title>Referral Dashboard</title>
            </Helmet>

            <PageHeader
                title="Referral Dashboard"
                breadcrumbs={[
                    { title: <><HomeOutlined /><span>Home</span></> },
                    { title: <><PieChartOutlined /><span>Dashboard</span></> },
                    { title: 'Referrals' },
                ]}
            />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Referrals"
                        extra={
                            <Space>
                                <Button icon={<PlusOutlined />} onClick={showAddModal}>
                                    New Referral
                                </Button>
                            </Space>
                        }
                        tabList={REFER_TABS}
                        activeTabKey={activeTabKey}
                        onTabChange={(key) => setActiveTabKey(key)}
                    >
                        {TAB_CONTENT[activeTabKey]}
                    </Card>
                </Col>
            </Row>

            <AddRefModal
                open={isAddModalOpen}
                onOk={() => setIsAddModalOpen(false)}
                onCancel={handleAddModalCancel}
                onAddRefer={handleAddRefer}
            />

            <EditRefModal
                open={isEditModalOpen}
                refer={currentRefer}  // Sử dụng currentRefer để truyền vào EditRefModal
                onCancel={handleEditModalCancel}
                onOk={handleUpdateRefer}
            />
        </div>
    );
};
