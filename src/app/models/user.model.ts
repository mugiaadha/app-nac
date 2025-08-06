export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  photo: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  role: string;
  status: string;
  last_seen: string;
  created_at: string | null;
  updated_at: string;
}
