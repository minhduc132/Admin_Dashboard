import { User } from './authService';

export interface Blog {
    id: string;
    title: string;
    content: string;
    userId: string;
    status: 'draft' | 'published' | 'pendingApproval';
    createdAt: string;
    updatedAt: string;
    tags?: string[];
    coverImage?: string;
    likes?: number;
    comments?: Comment[];
}

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    author: User;
}
// export const getUserById = (id: string): User | undefined => {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     return users.find((user: User) => user.id === id);
// };
