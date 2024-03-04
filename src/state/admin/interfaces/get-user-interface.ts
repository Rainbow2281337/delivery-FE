export interface UsersTable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface DeleteUser {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface User {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  phoneNumber: string | null;
  role: string | null;
}
