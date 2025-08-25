<template>
  <div class="card-modern">
    <div class="card-header-modern flex justify-between items-center">
      <h3 class="font-semibold">Testnet Endpoint</h3>
      <button @click="copyToClipboard" 
              class="btn-secondary-modern text-xs bg-white/20 hover:bg-white/30 border-white/30">
        <i class="fas fa-copy mr-1"></i>
        Copy
      </button>
    </div>
    <div class="card-body-modern">
      <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm break-all">
        <code class="text-gray-900 dark:text-gray-100">{{ endpoint }}</code>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WssUrl',
  props: {
    endpoint: {
      type: String,
      default: 'wss://xahau-test.net'
    }
  },
  setup(props) {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(props.endpoint)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    return {
      copyToClipboard
    }
  }
})
</script>

<style scoped>
/* Component-specific styles */
</style>
