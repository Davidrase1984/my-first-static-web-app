<template>
  <div class="card">
    <h2>Create Job</h2>
    <form @submit.prevent="save">
      <label>Job ID</label>
      <input v-model="id" placeholder="J200" required />

      <label>Title</label>
      <input v-model="title" placeholder="Backend Developer" required />

      <label>Department</label>
      <input v-model="dept" placeholder="IT" required />

      <label>Location</label>
      <input v-model="location" placeholder="Chennai" required />

      <button type="submit">Create</button>
      <p v-if="msg" class="msg">{{ msg }}</p>
    </form>
  </div>
</template>

<script>
import { addJob } from "../../services/db";

export default {
  data() {
    return { id: "", title: "", dept: "", location: "", msg: "" };
  },
  computed: {
    user() { return this.$store.getters.user; }
  },
  methods: {
    save() {
      addJob({
        id: this.id.trim(),
        title: this.title.trim(),
        dept: this.dept.trim(),
        location: this.location.trim(),
        owner: "manager1" // simple assignment for MVP
      });

      this.msg = "Job created!";
      this.id = this.title = this.dept = this.location = "";
      setTimeout(() => (this.msg = ""), 2000);
    }
  }
};
</script>

<style scoped>
.card { max-width:520px; padding:20px; border:1px solid #ddd; border-radius:10px; }
label { display:block; margin-top:10px; }
input { width:100%; padding:10px; margin-top:6px; }
button { margin-top:12px; padding:10px; background:#2563eb; color:#fff; border:0; cursor:pointer; width: 100%; }
.msg { margin-top: 10px; color:#065f46; }
</style>