import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Refer } from '../../types/referral';
import dayjs from 'dayjs';

interface EditRefModalProps {
    open: boolean;
    refer: Refer | null;  // Chúng ta cần đối tượng refer để chỉnh sửa
    onCancel: () => void;
    onOk: (updatedRefer: Refer) => void;
}

const EditRefModal: React.FC<EditRefModalProps> = ({ open, refer, onCancel, onOk }) => {
    const [form] = Form.useForm();

    // Khi modal mở, tự động điền dữ liệu hiện tại vào form
    useEffect(() => {
        if (refer) {
            form.setFieldsValue({
                referralLink: refer.referralLink,
                description: refer.description,
            });
        }
    }, [refer, form]);

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            if (refer) {
                const updatedRefer: Refer = {
                    ...refer, // Giữ lại các trường không thay đổi
                    referralLink: values.referralLink,
                    description: values.description || '',
                    updatedAt: dayjs().toISOString(),  // Cập nhật thời gian chỉnh sửa
                };
                onOk(updatedRefer);  // Gửi refer đã chỉnh sửa lên trang cha
                form.resetFields();  // Reset form
            }
        });
    };

    return (
        <Modal
            title="Edit Referral"
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            footer={[
                <Button key="back" onClick={onCancel}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>Update</Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="referralLink"
                    label="Referral Link"
                    rules={[{ required: true, message: 'Please input the referral link!' }]}
                >
                    <Input placeholder="Enter referral link" />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input placeholder="Optional description" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRefModal;
