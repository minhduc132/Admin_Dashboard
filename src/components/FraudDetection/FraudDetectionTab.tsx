import React from 'react';
import { Card, Row, Col, Typography, Tag } from 'antd';
import { FraudDetection } from '../../types/shop';

interface FraudDetectionListProps {
    data: FraudDetection[];
}

const FraudDetectionList: React.FC<FraudDetectionListProps> = ({ data }) => {
    return (
        <Row gutter={[16, 16]}>
            {data.map((item) => (
                <Col
                    xs={24} sm={12} md={8} lg={6} xl={4} key={item.id} // Điều chỉnh các cột theo kích thước màn hình
                >
                    <Card
                        hoverable
                        title={<Typography.Text strong>ID: {item.id}</Typography.Text>}
                        extra={
                            <Tag color={item.severityLevel === 'high' ? 'red' : item.severityLevel === 'medium' ? 'orange' : 'green'}>
                                Severity: {item.severityLevel.toUpperCase()}
                            </Tag>
                        }
                    >
                        <p><strong>Flagged Reviews:</strong> {item.flaggedReviewIds.length > 0 ? item.flaggedReviewIds.join(', ') : 'None'}</p>
                        <p><strong>Fake Product Listings:</strong> {item.fakeProductListingIds.length > 0 ? item.fakeProductListingIds.join(', ') : 'None'}</p>
                        <p><strong>Suspended Suppliers:</strong> {item.suspendedSupplierIds.length > 0 ? item.suspendedSupplierIds.join(', ') : 'None'}</p>
                        <p>
                            <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()} | <strong>Updated:</strong> {new Date(item.updatedAt).toLocaleString()}
                        </p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default FraudDetectionList;
