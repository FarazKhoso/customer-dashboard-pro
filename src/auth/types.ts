export interface User {
  id: string;
  email: string | null;
  user_metadata: {
    name?: string;
    avatar_url?: string;
    full_name?: string;
  };
}