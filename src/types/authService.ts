import { Product } from './shop';

// Kiểu Role định nghĩa tất cả các loại vai trò người dùng
export type Role = 'Super Admin' | 'Admin' | 'Seller' | 'Buyer' | 'Supplier' | 'Organization' | 'KOL' | 'Partner' | 'Employee';

// Interface cho đối tượng người dùng
export type User = {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    product?: Product;
    email: string;
    password?: string;
    status: string;
    role?: Role;
};

const STORAGE_KEY = 'users';
const DEFAULT_ROLE: Role = 'Buyer';

// Lấy toàn bộ danh sách người dùng từ localStorage
export const getAllUsers = (): User[] => {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
};

// Lưu người dùng mới vào localStorage và kiểm tra email trùng
export const saveUser = (user: User): void => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    const users = getAllUsers();
    if (isEmailTaken(user.email)) {
        throw new Error("Email đã được sử dụng");
    }

    users.push({
        ...user,
        role: user.role || DEFAULT_ROLE,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Kiểm tra người dùng hiện tại có quyền truy cập một vai trò 
export const canAccess = (requiredRole: Role): boolean => {
    const currentUser = getCurrentUser();
    return currentUser?.role === requiredRole;
};

// Kiểm tra quyền truy cập trang theo vai trò, nếu không có thì báo lỗi
export const checkAccess = (pageRole: Role): boolean => {
    if (!canAccess(pageRole)) {
        alert('False');
        return false;
    }
    return true;
};

export const initializeDefaultUsers = async (): Promise<void> => {
    const users = getAllUsers();
    if (users.length === 0) {
        try {
            const response = await fetch('./users.json');
            const defaultUsers: User[] = await response.json();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
            console.log('Default  users.json');
        } catch (error) {
            console.error('False users.json:', error);
        }
    }
};

// Kiểm tra email đã tồn tại chưa
export const isEmailTaken = (email: string): boolean => {
    const users = getAllUsers();
    return users.some((user) => user.email === email);
};

// Chỉ Super Admin có quyền thay đổi role người dùng
export const canEditRole = (): boolean => {
    const currentUser = getCurrentUser();
    return currentUser?.role === 'Super Admin';
};

// Chỉ Super Admin hoặc Supplier có thể quản lý người dùng
export const canPerformUserManagement = (): boolean => {
    const currentUser = getCurrentUser();
    return currentUser?.role === 'Super Admin' || currentUser?.role === 'Supplier';
};

// Thêm người dùng mới với kiểm tra quyền
export const addUser = (newUser: User): void => {
    if (!canPerformUserManagement()) {
        alert('Bạn không có quyền thực hiện hành động này');
        return;
    }
    saveUser(newUser);
};

// Sửa thông tin người dùng, chỉ Super Admin được đổi role
export const editUser = (updatedUser: User): void => {
    if (!canPerformUserManagement()) {
        alert('Bạn không có quyền thực hiện hành động này');
        return;
    }
    const users = getAllUsers();
    const index = users.findIndex(user => user.email === updatedUser.email);
    if (index !== -1) {
        if (!canEditRole() && updatedUser.role !== users[index].role) {
            alert('Bạn không có quyền thay đổi role của người dùng');
            return;
        }
        users[index] = updatedUser;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } else {
        alert('Không tìm thấy người dùng');
    }
};

// Xóa người dùng với kiểm tra quyền
export const deleteUser = (email: string): void => {
    if (!canPerformUserManagement()) {
        alert('Bạn không có quyền thực hiện hành động này');
        return;
    }
    const users = getAllUsers();
    const updatedUsers = users.filter(user => user.email !== email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
};

// Đăng nhập người dùng, lưu thông tin đăng nhập vào localStorage
// export const loginUser = (email: string, password: string): boolean => {
//     const users = getAllUsers();
//     const user = users.find((u) => u.email === email && u.password === password);
//     if (user) {
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         return true;
//     }
//     return false;
// };

// Lấy thông tin người dùng hiện tại đang đăng nhập
export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};
// Lấy thông tin người dùng theo id
export const getUserById = (id: string): User | undefined => {
    const users = getAllUsers();
    return users.find((user) => user.id === id);
};

export const loginUser = (email: string, password: string) => {
    const usersString = localStorage.getItem('users');
    if (!usersString) return null;

    const users = JSON.parse(usersString);
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
        // Lưu user đang đăng nhập vào localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    } else {
        return null;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('currentUser');
};

