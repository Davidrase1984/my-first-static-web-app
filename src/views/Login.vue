<template>
  <div class="card">
    <h2>Login</h2>
    <p class="hint">Try: admin1/admin123 | manager1/manager123 | director1/director123 | candidate1/candidate123</p>

    <form @submit.prevent="doLogin">
      <label>Username</label>
      <input v-model="username" placeholder="admin1" />

      <label>Password</label>
      <input type="password" v-model="password" placeholder="****" />

      <button type="submit">Sign in</button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { login } from "../services/auth";

export default {
  data() {
    return { username: "", password: "", error: "" };
  },
  methods: {
    doLogin() {
      this.error = "";
      try {
        const session = login(this.username.trim(), this.password);
        this.$store.dispatch("setSession", session);

        // Redirect based on role
        const role = session.user.role;
        const routeMap = {
          HR_ADMIN: "/admin",
          HIRING_MANAGER: "/manager",
          DIRECTOR: "/director",
          CANDIDATE: "/candidate"
        };
        this.$router.push(routeMap[role] || "/jobs");
      } catch (e) {
        this.error = e.message;
      }
    }
  }
};
</script>

<style scoped>
.card { max-width:420px; margin: 30px auto; padding:20px; border:1px solid #ddd; border-radius:10px; }
label { display:block; margin-top:10px; }
input { width:100%; padding:10px; margin-top:6px; }
button { margin-top:12px; width:100%; padding:10px; background:#2563eb; color:#fff; border:0; cursor:pointer; }
.error { margin-top:10px; color: #b91c1c; }
.hint { font-size: 12px; color:#555; }
</style>