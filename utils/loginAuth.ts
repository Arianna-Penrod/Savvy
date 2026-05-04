export function authenticateUser(username: string, password: string): boolean {
  const storedUsername = "MadiUser";
  const storedPassword = "Pass123!";

  return username === storedUsername && password === storedPassword;
}
