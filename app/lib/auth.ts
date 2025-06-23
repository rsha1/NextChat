import fs from "fs";
import path from "path";
import { compare, hash } from "bcryptjs";

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  role: "Admin" | "ECO" | "Client";
}

const usersFile = path.join(process.cwd(), "data", "users.json");

function readUsers(): User[] {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, "utf-8")) as User[];
}

function writeUsers(users: User[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

export async function createUser(
  email: string,
  password: string,
  role: User["role"],
) {
  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }
  const passwordHash = await hash(password, 10);
  const user: User = { id: Date.now(), email, passwordHash, role };
  users.push(user);
  writeUsers(users);
  return user;
}

export async function verifyUser(email: string, password: string) {
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  const ok = await compare(password, user.passwordHash);
  return ok ? user : null;
}

export function getUserByEmail(email: string) {
  return readUsers().find((u) => u.email === email) ?? null;
}
