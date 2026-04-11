export interface User {
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

