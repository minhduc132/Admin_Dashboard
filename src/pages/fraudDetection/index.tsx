// src/pages/FraudDetectionDashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { Card, PageHeader } from '../../components';
import { HomeOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { FraudDetection } from '../../types/shop';
import FraudDetectionList from '../../components/FraudDetection/FraudDetectionTab';
import AddFraudDetectionModal from '../../components/FraudDetection/AddFraudDetectionModal';

export const FraudDetectionDashboardPage: React.FC = () => {
    const [fraudList, setFraudList] = useState<FraudDetection[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Giả sử fetch dữ liệu từ '/fraudDetection.json'
    const { data: fraudData, error: fraudDataError } = useFetchData('/fraudDetection.json');

    // Load dữ liệu từ localStorage hoặc từ API
    useEffect(() => {
        const savedList = localStorage.getItem('fraudDetectionList');
        if (savedList) {
            setFraudList(JSON.parse(savedList));
        } else if (fraudData) {
            setFraudList(fraudData);
            localStorage.setItem('fraudDetectionList', JSON.stringify(fraudData));
        } else if (fraudDataError) {
            console.error('Error fetching fraud detection data:', fraudDataError);
            setFraudList([]);
            localStorage.setItem('fraudDetectionList', JSON.stringify([]));
        }
    }, [fraudData, fraudDataError]);

    // Hàm thêm mới fraud detection
    const handleAddFraudDetection = (newFraud: FraudDetection) => {
        const updatedList = [newFraud, ...fraudList];
        setFraudList(updatedList);
        localStorage.setItem('fraudDetectionList', JSON.stringify(updatedList));
    };

    const showAddModal = () => setIsAddModalOpen(true);
    const handleAddModalCancel = () => setIsAddModalOpen(false);

    return (
        <div>
            <Helmet>
                <title>Fraud Detection Dashboard</title>
            </Helmet>

            <PageHeader
                title="Fraud Detection Dashboard"
                breadcrumbs={[
                    { title: <><HomeOutlined /><span>Home</span></> },
                    { title: <><PieChartOutlined /><span>Dashboard</span></> },
                    { title: 'Fraud Detection' },
                ]}
            />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Fraud Detection Data"
                        extra={
                            <Space>
                                <Button icon={<PlusOutlined />} onClick={showAddModal}>
                                    New Fraud Detection
                                </Button>
                            </Space>
                        }
                    >
                        <FraudDetectionList data={fraudList} />
                    </Card>
                </Col>
            </Row>

            <AddFraudDetectionModal
                open={isAddModalOpen}
                onOk={() => setIsAddModalOpen(false)}
                onCancel={handleAddModalCancel}
                onAddFraudDetection={handleAddFraudDetection}
            />
        </div>
    );
};
