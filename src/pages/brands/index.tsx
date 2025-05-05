import { useEffect, useState, useRef } from 'react';
import { Button, Card, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Brand } from '../../types/shop';
import { BrandTable } from '../../components/Brand/BrandTable';
import AddBrandModal from '../../components/Brand/AddBrandModal';
import BrandDetailModal from '../../components/Brand/BrandDetailModal';

const LOCAL_STORAGE_KEY = 'brands';

export const BrandsDashboardPage = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const isFirstLoad = useRef(true);

    const mockBrands: Brand[] = [
        {
            id: "1",
            name: "Nike",
            logoUrl: "https://example.com/nike-logo.png",
            description: "Nike is a global brand known for its sportswear.",
            contactInfo: "contact@nike.com",
            status: "active",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: "2",
            name: "Adidas",
            logoUrl: "https://example.com/adidas-logo.png",
            description: "Adidas is a leading sportswear company.",
            contactInfo: "contact@adidas.com",
            status: "active",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            setBrands(JSON.parse(stored));
        } else {
            setBrands(mockBrands);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockBrands));
        }
    }, []);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(brands));
    }, [brands]);

    const handleAddOrEditBrand = (brand: Brand) => {
        const exists = brands.find((b) => b.id === brand.id);
        if (exists) {
            setBrands((prev) => prev.map((b) => (b.id === brand.id ? brand : b)));
            message.success('Brand updated successfully');
        } else {
            setBrands((prev) => [...prev, brand]);
            message.success('Brand added successfully');
        }
        setIsAddModalOpen(false);
    };

    const handleDeleteBrand = (id: string) => {
        Modal.confirm({
            title: 'Delete',
            content: 'Are you sure you want to delete this brand?',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => {
                setBrands((prev) => prev.filter((b) => b.id !== id));
                message.success('Brand deleted successfully');
            },
        });
    };

    return (
        <Card
            title="Brand Management"
            extra={
                <Button icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                    Add Brand
                </Button>
            }
        >
            <BrandTable
                data={brands}
                onEdit={(brand) => {
                    setSelectedBrand(brand);
                    setIsAddModalOpen(true);
                }}
                onDelete={handleDeleteBrand}
                onView={(brand) => {
                    setSelectedBrand(brand);
                    setIsDetailOpen(true);
                }}
            />

            <AddBrandModal
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                onCreate={handleAddOrEditBrand}
                initialData={selectedBrand}
            />

            <BrandDetailModal
                open={isDetailOpen}
                brand={selectedBrand}
                onClose={() => setIsDetailOpen(false)}
            />
        </Card>
    );
};

export default BrandsDashboardPage;
