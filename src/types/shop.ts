import { User } from './authService';

// Interface cho Product (Quản lý sản phẩm)
export interface Product {
    id: string;
    name: string; // Tên sản phẩm
    description: string; // Mô tả sản phẩm
    imageUrl: string; // Link ảnh sản phẩm
    price: number; // Giá tiền
    stockStatus: 'inStock' | 'outOfStock' | 'preOrder'; // Trạng thái Sản phẩm còn ,hết , trong giỏ
    categoryId?: string; // Thay đổi category thành ID danh mục sản phẩm
    brandId?: string; // Thay đổi brand thành ID thương hiệu
    discount?: number; // Giảm giá
    isReviewEnabled: boolean; // Cho phép đánh giá
    createdAt: string;
    updatedAt: string;
}

// Interface cho Category (Quản lý danh mục)
export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

// Interface cho Brand (Quản lý thương hiệu)
export interface Brand {
    id: string;
    name: string; // Tên thương hiệu
    logoUrl: string; // Logo thương hiệu
    description: string; // Mô tả thương hiệu
    contactInfo: string; // Thông tin liên hệ
    status: 'active' | 'inactive' | 'blacklisted'; // Trạng thái: hoạt động, không hoạt động, bị cấm
    productIds?: string[]; // Chỉ lưu ID của các sản phẩm thuộc thương hiệu
    createdAt: string;
    updatedAt: string;
}

// Interface cho Supplier (Quản lý nhà cung cấp)
export interface Supplier {
    id: string; // Mã nhà cung cấp
    name: User; // Tên nhà cung cấp
    contactInfo: string; // Thông tin liên hệ
    approvalStatus: 'pending' | 'approved' | 'rejected'; // Trạng thái phê duyệt: chờ, duyệt, từ chối
    assignedProductIds: string[]; // Chỉ lưu ID của các sản phẩm được phân phối
    performance: { // Hiệu suất nhà cung cấp
        onTimeDeliveryRate: number; // Tỷ lệ giao hàng đúng hạn
        disputeRate: number; // Tỷ lệ tranh chấp
        salesVolume: number; // Tổng doanh số
    };
    isBanned: boolean; // Nhà cung cấp có bị cấm không
    createdAt: string;
    updatedAt: string;
}

// Interface cho AffiliateProgram (Chương trình liên kết)
export interface AffiliateProgram {
    id: string;
    name: string; // Tên chương trình
    commissionRate: number; // Tỷ lệ hoa hồng (%)
    commissionType: 'product' | 'category' | 'fixed'; // Loại hoa hồng: theo sản phẩm, theo danh mục, hoặc cố định
    approvalStatus: 'pending' | 'approved' | 'rejected'; // Trạng thái xét duyệt
    affiliateIds: string[]; // Chỉ lưu ID của cộng tác viên
    createdAt: string;
    updatedAt: string;
}

// Interface cho Affiliate (Cộng tác viên)
export interface Affiliate {
    id: string; // Mã cộng tác viên
    affiliateLink: string; // Link giới thiệu
    commissionEarned: number; // Hoa hồng đã kiếm được
    status: 'active' | 'inactive'; // Trạng thái hoạt động
}

// Interface cho Order (Quản lý đơn hàng)
export interface OrderItem {
    productId: string;  // Chỉ lưu ID sản phẩm
    quantity: number;  // Số lượng của sản phẩm trong đơn
}

export interface Order {
    id: string;
    customerId: string; // Mã khách hàng
    orderItems: OrderItem[];  // Danh sách các sản phẩm và số lượng trong đơn
    totalAmount: number; // Tổng tiền đơn hàng
    status: 'to pay' | 'to ship' | 'complant' | 'cancel' | 'refunded'; // Trạng thái đơn hàng
    trackingInfo?: string; // Mã vận đơn (nếu có)
    disputeStatus?: 'open' | 'resolved' | 'pending'; // Tình trạng tranh chấp
    createdAt: string;
    updatedAt: string;
}

// Interface cho FraudDetection (Phát hiện gian lận)
export interface FraudDetection {
    id: string; // Mã phát hiện
    flaggedReviewIds: string[]; // ID của các đánh giá bị đánh dấu
    fakeProductListingIds: string[]; // ID của các sản phẩm giả mạo
    suspendedSupplierIds: string[]; // ID của các nhà cung cấp bị đình chỉ
    severityLevel: 'low' | 'medium' | 'high'; // Mức độ nghiêm trọng
    createdAt: string;
    updatedAt: string;
}

// Interface cho SalesReport (Báo cáo bán hàng)
export interface SalesReport {
    id: string;
    productSales: { productId: string, salesAmount: number }[]; // Doanh số theo sản phẩm
    brandSales: { brandId: string, salesAmount: number }[]; // Doanh số theo thương hiệu
    categorySales: { categoryId: string, salesAmount: number }[]; // Doanh số theo danh mục
    supplierSales: { supplierId: string, salesAmount: number }[]; // Doanh số theo nhà cung cấp
    abandonedCarts: number; // Số giỏ hàng bị bỏ rơi
    failedPayments: number; // Số giao dịch thất bại
    createdAt: string;
}

// Interface cho Pricing (Gói đăng ký theo Pricing)
export interface Pricing {
    id: string;
    name: string; // Tên gói
    duration: 'monthly' | 'quarterly' | 'yearly'; // Thời hạn: tháng, quý, năm
    benefits: string[]; // Các lợi ích đi kèm
    price: number; // Giá gói
    status: 'active' | 'inactive'; // Trạng thái
    createdAt: string;
    updatedAt: string;
}

// Interface cho SubscriptionPricing (Người dùng sử dụng gói đăng ký)
export interface SubscriptionPricing {
    userId: string; // Mã người dùng
    planId: string; // Mã gói đăng ký
    status: 'active' | 'canceled' | 'expired'; // Trạng thái đăng ký
    renewalDate: string; // Ngày gia hạn
}

// Interface cho StoreActivation (Theo dõi kích hoạt cửa hàng)
export interface StoreActivation {
    userId: string; // Mã người dùng
    storeName: string; // Tên cửa hàng
    salesData: {
        totalSales: number; // Tổng doanh số
        monthlySales: number; // Doanh số theo tháng
    };
    storeStatus: 'active' | 'inactive'; // Trạng thái cửa hàng
    adminAnalytics: string; // Dữ liệu phân tích nội bộ theo dashboard cửa hàng
    createdAt: string;
}

// Interface cho Store (Cửa hàng)
export interface Store {
    id: string;
    name: string; // Tên cửa hàng
    ownerId: string; // Mã chủ sở hữu
    status: 'active' | 'inactive'; // Trạng thái hoạt động
    productIds: string[]; // Chỉ lưu ID của các sản phẩm
    brandId: string; // Chỉ lưu ID thương hiệu liên kết
    supplierIds: string[]; // Chỉ lưu ID của các nhà cung cấp
    affiliateProgramId: string; // Chỉ lưu ID của chương trình liên kết
    orderIds: string[]; // Chỉ lưu ID của các đơn hàng
    subscriptionId: string; // Chỉ lưu ID của gói đăng ký
    storeActivationId: string; // Chỉ lưu ID của thông tin kích hoạt cửa hàng
    createdAt: string;
    updatedAt: string;
}
