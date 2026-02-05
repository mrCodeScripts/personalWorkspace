export type User = {
  name: string;
  age: number;
};

export async function giveDataExample1(): Promise<User[]> {
  const user1: User = { name: "John Doe", age: 19 };
  const user2: User = { name: "John Doe", age: 19 };
  const users: User[] = [user1, user2];
  await new Promise((res) => setTimeout(res, 3000));
  return users;
}
