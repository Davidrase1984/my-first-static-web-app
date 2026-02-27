<template>
  <div>
    <h2>Applications</h2>

    <div v-for="a in filtered" :key="a.id" class="app">
      <div>
        <b>{{ a.jobTitle }}</b> ({{ a.jobId }})<br />
        Candidate: <b>{{ a.candidate }}</b><br />
        Status: <b>{{ a.status }}</b>
      </div>

      <div class="actions" v-if="role==='HIRING_MANAGER'">
        <button class="short" @click="setStatus(a.id, 'SHORTLISTED')">Shortlist</button>
        <button class="rej" @click="setStatus(a.id, 'REJECTED')">Reject</button>
      </div>
    </div>

    <p v-if="filtered.length===0">No applications found.</p>
  </div>
</template>

<script>
import { listApplications, updateApplicationStatus } from "../../services/db";

export default {
  data() {
    return { apps: [] };
  },
  computed: {
    role() { return this.$store.getters.role; },
    user() { return this.$store.getters.user; },
    filtered() {
      // HR Admin sees all
      if (this.role === "HR_ADMIN") return this.apps;

      // Hiring manager sees apps for their jobs (simple MVP: owner is manager1)
      // We kept jobs owner in db; for MVP we'll just show all to manager1
      return this.apps; 
    }
  },
  mounted() {
    this.apps = listApplications();
  },
  methods: {
    setStatus(appId, status) {
      updateApplicationStatus(appId, status);
      this.apps = listApplications();
    }
  }
};
</script>

<style scoped>
.app { border:1px solid #ddd; border-radius:10px; padding: 12px; margin-bottom: 10px; display:flex; justify-content:space-between; gap: 10px; }
.actions button { margin-left: 8px; padding: 8px 10px; border:0; cursor:pointer; color:#fff; }
.short { background:#16a34a; }
.rej { background:#dc2626; }
</style>