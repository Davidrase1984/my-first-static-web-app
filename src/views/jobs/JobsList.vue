<template>
  <div>
    <h2>Jobs</h2>
    <p v-if="jobs.length===0">No jobs available</p>

    <div class="grid">
      <div v-for="j in jobs" :key="j.id" class="job">
        <h3>{{ j.title }}</h3>
        <p><b>ID:</b> {{ j.id }}</p>
        <p><b>Dept:</b> {{ j.dept }} | <b>Location:</b> {{ j.location }}</p>

        <button v-if="role==='CANDIDATE'" @click="apply(j)">Apply</button>
      </div>
    </div>

    <p v-if="msg" class="msg">{{ msg }}</p>
  </div>
</template>

<script>
import { listJobs, applyToJob } from "../../services/db";

export default {
  data() {
    return { jobs: [], msg: "" };
  },
  computed: {
    role() { return this.$store.getters.role; },
    user() { return this.$store.getters.user; }
  },
  mounted() {
    this.jobs = listJobs();
  },
  methods: {
    apply(job) {
      const app = {
        id: "A" + Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        candidate: this.user.username,
        status: "APPLIED",
        createdAt: new Date().toISOString()
      };
      applyToJob(app);
      this.msg = `Applied successfully for ${job.title} (${job.id})`;
      setTimeout(() => (this.msg = ""), 2500);
    }
  }
};
</script>

<style scoped>
.grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.job { border:1px solid #ddd; border-radius:10px; padding: 12px; }
button { padding: 8px 10px; background:#16a34a; color:#fff; border:0; cursor:pointer; }
.msg { margin-top: 12px; color:#065f46; }
</style>