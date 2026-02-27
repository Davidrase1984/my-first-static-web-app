<template>
  <div>
    <AppNav />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNav from "./components/AppNav.vue";
export default { components: { AppNav } };
</script>

<style>
.container { padding: 16px; font-family: Arial, sans-serif; }
</style>
