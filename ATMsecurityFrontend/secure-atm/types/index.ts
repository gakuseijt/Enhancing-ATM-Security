export interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    profile_image: string | null;
    created_at: string;
    updated_at: string;
    role: string;
  }