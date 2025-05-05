import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Product, Brand } from '../../types/shop';

type Props = {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    onAddProduct: (product: Product) => void;
};

const AddProductModal: React.FC<Props> = ({ open, onOk, onCancel, onAddProduct }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]); // State to hold brands data from localStorage
    const [loadingBrands, setLoadingBrands] = useState<boolean>(false); // To handle loading state

    // Fetch brands data from localStorage or API
    useEffect(() => {
        const storedBrands = JSON.parse(localStorage.getItem('brands') || '[]');
        if (storedBrands.length > 0) {
            setBrands(storedBrands);
        } else {
            // If no data in localStorage, fetch from API
            fetchBrandsFromApi();
        }
    }, []);

    // Fetch brands from API and store them in localStorage
    const fetchBrandsFromApi = async () => {
        setLoadingBrands(true);
        try {
            const response = await fetch('/api/brands'); // Call your API endpoint here
            const data = await response.json();
            if (data && Array.isArray(data)) {
                setBrands(data);
                localStorage.setItem('brands', JSON.stringify(data)); // Save to localStorage
            }
        } catch (error) {
            message.error('Failed to load brands from API.');
        } finally {
            setLoadingBrands(false);
        }
    };

    const handleImageChange = async (info: any) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url);
        } else if (info.file.status === 'uploading') {
            // Show loading or handle preview image while uploading
        } else if (info.file.status === 'error') {
            message.error('Image upload failed!');
        }
    };

    const handleUpload = async (file: File) => {
        const isImage = file.type.startsWith('image/');
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isImage) {
            message.error('Only image files are allowed!');
            return Upload.LIST_IGNORE;
        }

        if (!isLt5M) {
            message.error('Image must be smaller than 5MB!');
            return Upload.LIST_IGNORE;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        form.setFieldsValue({ imageUrl: reader.result as string });
        return false;
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            const newProduct: Product = {
                id: String(Date.now()),
                name: values.name,
                description: values.description,
                price: values.price,
                stockStatus: values.stockStatus,
                categoryId: values.category,
                brandId: values.brand, // Use the selected brand
                imageUrl: imageUrl || '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isReviewEnabled: false,
            };
            onAddProduct(newProduct);
            onOk();
        });
    };

    return (
        <Modal
            title="Add New Product"
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Add Product"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Product Image">
                    <Upload
                        name="file"
                        action="/upload"
                        onChange={handleImageChange}
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={handleUpload}
                    >
                        {preview ? (
                            <img src={preview} alt="product" style={{ width: '100%' }} />
                        ) : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Stock Status"
                    name="stockStatus"
                    rules={[{ required: true, message: 'Please select stock status!' }]}
                >
                    <Select>
                        <Select.Option value="inStock">In Stock</Select.Option>
                        <Select.Option value="outOfStock">Out of Stock</Select.Option>
                        <Select.Option value="preOrder">Pre-Order</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select>
                        <Select.Option value="electronics">Electronics</Select.Option>
                        <Select.Option value="fashion">Fashion</Select.Option>
                        <Select.Option value="home-appliances">Home Appliances</Select.Option>
                        <Select.Option value="books">Books</Select.Option>
                        <Select.Option value="sports">Sports</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true, message: 'Please select a brand!' }]}
                >
                    <Select loading={loadingBrands}>
                        {brands.map((brand: Brand) => (
                            <Select.Option key={brand.id} value={brand.id}>
                                {brand.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default AddProductModal;
