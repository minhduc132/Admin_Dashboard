import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { SocialMediaPost } from '../../types/socialmediapost ';

interface SocialMediaTabProps {
    data: SocialMediaPost[];
    onEdit: (post: SocialMediaPost) => void;
}

const SocialMediaTab: React.FC<SocialMediaTabProps> = ({ data, onEdit }) => {
    return (
        <Row gutter={[16, 16]}>
            {data.map((post) => (
                <Col
                    xs={24} sm={12} md={8} lg={6} xl={4} key={post.id}
                >
                    <Card
                        hoverable
                        title={post.platform.name}
                        extra={
                            <Button type="link" onClick={() => onEdit(post)}>
                                Edit
                            </Button>
                        }
                    >
                        <p><strong>Content:</strong> {post.content}</p>
                        <p><strong>Post Date:</strong> {post.postDate}</p>
                        {post.sourceUrl && <p><strong>Source URL:</strong> <a href={post.sourceUrl}>{post.sourceUrl}</a></p>}
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default SocialMediaTab;
