<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>HR Recruitment Portal</h1>
        <p>Sign in to your account</p>
      </div>

      <div class="role-tabs">
        <button 
          v-for="r in roles" 
          :key="r.value"
          :class="['role-tab', { active: selectedRole === r.value }]"
          @click="selectedRole = r.value"
        >
          <span class="role-icon">{{ r.icon }}</span>
          <span class="role-label">{{ r.label }}</span>
        </button>
      </div>

      <form @submit.prevent="doLogin" class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input v-model="username" placeholder="Enter your username" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" class="login-btn">Sign In</button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <p class="hint">
        Demo: {{ demoCredentials[selectedRole] }}
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "../services/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      selectedRole: "CANDIDATE",
      roles: [
        { value: "CANDIDATE", label: "Candidate", icon: "👤" },
        { value: "HIRING_MANAGER", label: "Hiring Manager", icon: "👔" },
        { value: "HR_ADMIN", label: "HR Manager", icon: "💼" },
        { value: "DIRECTOR", label: "Director", icon: "🎯" }
      ],
      demoCredentials: {
        CANDIDATE: "candidate1 / candidate123",
        HIRING_MANAGER: "manager1 / manager123",
        HR_ADMIN: "admin1 / admin123",
        DIRECTOR: "director1 / director123"
      }
    };
  },
  methods: {
    doLogin() {
      this.error = "";
      try {
        const session = login(this.username.trim(), this.password);
        
        if (session.user.role !== this.selectedRole) {
          this.error = `Please login as ${this.getRoleLabel(session.user.role)} or select the correct role`;
          return;
        }

        this.$store.dispatch("setSession", session);
        const routeMap = {
          HR_ADMIN: "/admin",
          HIRING_MANAGER: "/manager",
          DIRECTOR: "/director",
          CANDIDATE: "/candidate"
        };
        this.$router.push(routeMap[session.user.role] || "/jobs");
      } catch (e) {
        this.error = e.message;
      }
    },
    getRoleLabel(role) {
      const r = this.roles.find(r => r.value === role);
      return r ? r.label : role;
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
  padding: 20px;
}

.login-container {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.login-header p {
  color: #64748b;
  margin: 0;
}

.role-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 28px;
}

.role-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 10px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
}

.role-tab:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.role-tab.active {
  border-color: #2563eb;
  background: #eff6ff;
}

.role-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.role-label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.role-tab.active .role-label {
  color: #2563eb;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #1d4ed8;
}

.error {
  margin-top: 16px;
  padding: 12px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  text-align: center;
}

.hint {
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  background: #f9fafb;
  padding: 10px;
  border-radius: 6px;
}
</style>