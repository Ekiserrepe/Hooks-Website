<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Faucet />
      </div>
      
      <div class="space-y-6">
        <WssUrl :endpoint="endpoint" />
        <LastLedger :endpoint="endpoint" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import WssUrl from './WssUrl.vue'
import Faucet from './Faucet.vue'
import LastLedger from './LastLedger.vue'

export default defineComponent({
  name: 'Body',
  components: {
    WssUrl,
    Faucet,
    LastLedger
  },
  setup() {
    const endpoint = ref('wss://xahau-test.net')
    
    return {
      endpoint
    }
  }
})
</script>

<style scoped>
/* Component-specific styles */
</style>
