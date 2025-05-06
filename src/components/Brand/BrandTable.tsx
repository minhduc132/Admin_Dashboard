import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Typography,
  Image,
  Button,
  Modal,
  message,
  Card,
  Row,
  Col,
} from "antd";
import {
  EyeTwoTone,
  EditTwoTone,
  DeleteTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Brand } from "../../types/shop";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import AddBrandModal from "./AddBrandModal";
import BrandDetailModal from "./BrandDetailModal";

const LOCAL_STORAGE_KEY = "brands";

const statusColors: Record<Brand["status"], string> = {
  active: "green",
  inactive: "default",
  blacklisted: "red",
};

export const BrandTable: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isFirstLoad = React.useRef(true);

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
      message.success("Brand updated successfully");
    } else {
      setBrands((prev) => [...prev, brand]);
      message.success("Brand added successfully");
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteBrand = (id: string) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure you want to delete this brand?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        setBrands((prev) => prev.filter((b) => b.id !== id));
        message.success("Brand deleted successfully");
      },
    });
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "logoUrl",
      key: "logo",
      render: (url: string) => (
        <Image
          src={url || "/default-logo.png"}
          width={40}
          height={40}
          preview={false}
        />
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Typography.Text strong>{text}</Typography.Text>
      ),
    },
    {
      title: "Contact Info",
      dataIndex: "contactInfo",
      key: "contactInfo",
      render: (contactInfo: string) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {contactInfo}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Number Products",
      dataIndex: "productIds",
      key: "productIds",
      render: (productIds: string[]) => (
        <Typography.Paragraph
          style={{ color: "red", fontWeight: 700, marginBottom: 0 }}
        >
          {productIds?.length || 0}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Brand["status"]) => (
        <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Brand) => (
        <div style={{ display: "flex", gap: 12 }}>
          <EyeTwoTone
            style={{ cursor: "pointer", color: "#52c41a" }}
            onClick={() => {
              setSelectedBrand(record);
              setIsDetailOpen(true);
            }}
          />
          <EditTwoTone
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => {
              setSelectedBrand(record);
              setIsAddModalOpen(true);
            }}
          />
          <DeleteTwoTone
            style={{ cursor: "pointer", color: "#f5222d" }}
            onClick={() => handleDeleteBrand(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Brand Dashboard</title>
      </Helmet>

      <PageHeader
        title=""
        breadcrumbs={[{ title: "Home", path: "/" }, { title: "Brand" }]}
      />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Brand Management"
            extra={
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedBrand(null);
                  setIsAddModalOpen(true);
                }}
              >
                Add Brand
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={brands}
              rowKey={(record) => record.id}
            />
          </Card>
        </Col>
      </Row>

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
    </>
  );
};

export default BrandTable;
