export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
};

export interface UserProfile {
  user: User;
  bio: string;
  profilePictureUrl: string;
};

