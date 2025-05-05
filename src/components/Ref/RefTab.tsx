import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { Refer } from '../../types/referral';

interface RefTabProps {
    data: Refer[];
    onEdit: (referral: Refer) => void;
}

const RefTab: React.FC<RefTabProps> = ({ data, onEdit }) => {
    return (
        <Row gutter={[16, 16]}>
            {data.map((referral) => (
                <Col
                    xs={24} sm={12} md={8} lg={6} xl={4} key={referral.id}
                >
                    <Card
                        hoverable
                        title={referral.referralLink}
                        extra={
                            <Button type="link" onClick={() => onEdit(referral)}>
                                Edit
                            </Button>
                        }
                    >
                        <p><strong>Clicks:</strong> {referral.clickCount}</p>
                        <p><strong>Registrations:</strong> {referral.registrationCount}</p>
                        {referral.description && <p><strong>Description:</strong> {referral.description}</p>}
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default RefTab;
