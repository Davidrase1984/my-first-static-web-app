const AUTH_KEY = "hr_app_auth_v1";

const users = [
  { username: "admin1", password: "admin123", role: "HR_ADMIN", displayName: "HR Admin" },
  { username: "manager1", password: "manager123", role: "HIRING_MANAGER", displayName: "Hiring Manager" },
  { username: "director1", password: "director123", role: "DIRECTOR", displayName: "Director" },
  { username: "candidate1", password: "candidate123", role: "CANDIDATE", displayName: "Candidate" }
];

export function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error("Invalid username/password");

  // Mock token
  const session = {
    token: "mock-token-" + Date.now(),
    user: { username: user.username, role: user.role, displayName: user.displayName }
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}