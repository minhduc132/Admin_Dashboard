
export interface Refer {
    id: string;                // ID duy nhất cho referral
    referralLink: string;      // Đường dẫn giới thiệu của người dùng
    userId: string;            // ID của người dùng sở hữu referral này
    clickCount: number;        // Số lần click vào link giới thiệu
    registrationCount: number; // Số lượng tài khoản đăng ký thông qua link referral
    isOnline?: boolean;        // (Tùy chọn) Trạng thái online của người dùng khi theo dõi referral (nếu cần)
    createdAt: string;         // Thời điểm tạo referral (ISO string hoặc định dạng bạn chọn)
    updatedAt: string;         // Thời điểm cập nhật lần cuối
    description?: string;      // (Tùy chọn) Mô tả hoặc ghi chú cho referral
}
