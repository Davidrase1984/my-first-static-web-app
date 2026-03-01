<template>
  <nav class="nav" v-if="isAuthed">
    <div class="left">
      <strong>HR Recruitment</strong>
      <router-link to="/jobs">Jobs</router-link>

      <router-link v-if="role==='HR_ADMIN'" to="/admin">Admin</router-link>
      <router-link v-if="role==='HIRING_MANAGER'" to="/manager">Manager</router-link>
      <router-link v-if="role==='DIRECTOR'" to="/director">Director</router-link>
      <router-link v-if="role==='CANDIDATE'" to="/candidate">Candidate</router-link>

      <router-link v-if="role==='HR_ADMIN'" to="/jobs/create">Create Job</router-link>
      <router-link v-if="role==='HR_ADMIN' || role==='HIRING_MANAGER'" to="/applications">Applications</router-link>
    </div>

    <div class="right">
      <span>{{ user.displayName }} ({{ role }})</span>
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isAuthed() { return this.$store.getters.isAuthed; },
    user() { return this.$store.getters.user || {}; },
    role() { return this.$store.getters.role; }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.nav { display:flex; justify-content:space-between; padding:12px; background:#1f2937; color:#fff; }
a { color:#fff; margin-left:12px; text-decoration:none; }
button { margin-left:12px; padding:6px 10px; cursor:pointer; }
</style>