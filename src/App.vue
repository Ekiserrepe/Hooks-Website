<template>
  <div id="app" class="min-h-screen transition-theme">
    <Header />
    <Body />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Body from './components/Body.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Body
  }
})
</script>

<style>
/* Global overrides if needed */
</style>
