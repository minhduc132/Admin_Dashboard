export interface SocialMediaPost {
    id: string;
    userId: string;           // ID người dùng sở hữu bài đăng
    platform: Platform;       // Thông tin nền tảng bài đăng đến từ lấy từ list interface duoiws
    content: string;          // Nội dung bài đăng
    postDate: string;         // Ngày bài đăng được tạo
    sourceUrl?: string;       // URL gốc của bài đăng (nếu có)
    createdAt: string;        // Thời gian bài đăng được sao chép vào hệ thống
    updatedAt: string;        // Thời gian bài đăng được cập nhật
}

export interface Platform {
    name: string;             // Tên nền tảng (Facebook, Thred, v.v...)
    url: string;              // URL chính thức của nền tảng
}
