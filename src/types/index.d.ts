export type User = {
  id: string;
  name: string;
  avatar: string;
};
export type AuthContextType = {
  user: User | undefined;
  signIn: () => Promise<void>;
};
