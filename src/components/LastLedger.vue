<template>
  <div class="card-modern">
    <div class="card-header-modern flex justify-between items-center">
      <div class="flex items-center space-x-2 flex-wrap">
        <h3 class="font-semibold">Testnet Status</h3>
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 rounded-full" 
               :class="ledgerInfo === 'Connecting...' ? 'bg-yellow-400' : 'bg-green-400'"></div>
          <span class="text-xs text-white/80">
            {{ ledgerInfo === 'Connecting...' ? 'Connecting' : 'Live' }}
          </span>
        </div>
      </div>
      <button @click="copyLedgerInfo" 
              class="btn-secondary-modern text-xs bg-white/20 hover:bg-white/30 border-white/30 flex-shrink-0"
              :disabled="ledgerInfo === 'Connecting...'">
        <i class="fas fa-copy mr-1"></i>
        <span class="hidden sm:inline">Copy JSON</span>
        <span class="sm:hidden">Copy</span>
      </button>
    </div>
    
    <div class="card-body-modern">
      <div v-if="ledgerInfo === 'Connecting...'" 
           class="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
          <p>Connecting to network...</p>
        </div>
      </div>
      
      <div v-else class="space-y-4">
        <!-- Key Metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
              {{ ledgerInfo.ledger_index || 'N/A' }}
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Ledger Index</div>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-green-600 dark:text-green-400">
              {{ ledgerInfo.txn_count || 0 }}
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Transactions</div>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-purple-600 dark:text-purple-400">
              {{ formatTime(ledgerInfo.ledger_time) }}
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Ledger Time</div>
          </div>
        </div>
        
        <!-- JSON Data -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Raw Ledger Data</h4>
            <button @click="toggleExpanded" 
                    class="btn-secondary-modern text-xs">
              <i class="fas" :class="expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              {{ expanded ? 'Collapse' : 'Expand' }}
            </button>
          </div>
          
          <div v-if="expanded" class="font-mono text-xs overflow-auto max-h-96">
            <pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded border text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ JSON.stringify(ledgerInfo, null, 2) }}</pre>
          </div>
          
          <div v-else class="text-gray-500 dark:text-gray-400 text-sm">
            Click expand to view full JSON data
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { XrplClient } from 'xrpl-client'

export default defineComponent({
  name: 'LastLedger',
  props: {
    endpoint: {
      type: String,
      default: 'wss://xahau-test.net'
    }
  },
  setup(props) {
    const ledgerInfo = ref('Connecting...')
    const connection = ref(null)
    const expanded = ref(false)

    const copyLedgerInfo = async () => {
      try {
        await navigator.clipboard.writeText(JSON.stringify(ledgerInfo.value, null, 2))
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
    
    const toggleExpanded = () => {
      expanded.value = !expanded.value
    }
    
    const formatTime = (timestamp) => {
      if (!timestamp) return 'N/A'
      const date = new Date((timestamp + 946684800) * 1000) // XRP Ledger epoch adjustment
      return date.toLocaleTimeString()
    }

    onMounted(async () => {
      connection.value = await new XrplClient(props.endpoint)
      connection.value.on('ledger', ledger => {
        ledgerInfo.value = {
          ledger_index: ledger.ledger_index,
          ledger_time: ledger.ledger_time,
          txn_count: ledger.txn_count,
          validated_ledgers: ledger.validated_ledgers,
          type: ledger.type,
          ledger_hash: ledger.ledger_hash,
          ...ledger
        }
      })
    })

    return {
      ledgerInfo,
      expanded,
      copyLedgerInfo,
      toggleExpanded,
      formatTime
    }
  }
})
</script>

<style scoped>
/* Component-specific styles */
</style>
