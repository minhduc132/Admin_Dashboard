import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import { Product } from '../../types/shop'; // Đảm bảo kiểu Product được định nghĩa đúng

const { Option } = Select;

type Props = {
    open: boolean;
    onCancel: () => void;
    onUpdate: (updatedProduct: Product) => void;
    product: Product | null;
    categories: { id: string, name: string }[];  // Danh sách category
    brands: { id: string, name: string }[];      // Danh sách brand
};

const EditProductModal: React.FC<Props> = ({ open, onCancel, onUpdate, product, categories, brands }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name,
                price: product.price,
                description: product.description,
                stockStatus: product.stockStatus,
                category: product.categoryId,  // Thay đổi thành categoryId
                brand: product.brandId,        // Thay đổi thành brandId
            });
        }
    }, [product, form]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (!product) return;
            const updated: Product = {
                ...product,
                name: values.name,
                price: values.price,
                description: values.description,
                stockStatus: values.stockStatus,
                categoryId: values.category,
                brandId: values.brand,
            };
            onUpdate(updated);
            form.resetFields();
        });
    };
    return (
        <Modal
            title="Edit Product"
            open={open}
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
            onOk={handleOk}
            okText="Save"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input product name!' }]}>
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input price!' }]}>
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="Enter price"
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input product description!' }]}>
                    <Input.TextArea placeholder="Enter product description" rows={4} />
                </Form.Item>

                <Form.Item
                    label="Stock Status"
                    name="stockStatus"
                    rules={[{ required: true, message: 'Please select stock status!' }]}>
                    <Select placeholder="Select stock status">
                        <Option value="inStock">In Stock</Option>
                        <Option value="outOfStock">Out of Stock</Option>
                        <Option value="preOrder">Pre Order</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category!' }]}>
                    <Select placeholder="Select Category">
                        {categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true, message: 'Please select brand!' }]}>
                    <Select placeholder="Select Brand">
                        {brands.map((brand) => (
                            <Option key={brand.id} value={brand.id}>
                                {brand.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProductModal;
