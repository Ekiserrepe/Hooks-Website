<template>
  <div class="card-modern">
    <div class="card-header-modern flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <h3 class="font-semibold">Xahau Faucet</h3>
        <span class="badge-warning-modern">Testnet</span>
      </div>
      <button v-if="faucet.Address !== '-'" 
              @click="getSome" 
              class="btn-primary-modern text-sm bg-white/20 hover:bg-white/30 border-white/30">
        <i class="fas fa-redo mr-1"></i>
        Get Again
      </button>
    </div>
    
    <div class="card-body-modern">
      <!-- Error Message -->
      <div v-if="error !== ''" 
           class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div class="flex items-center">
          <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
          <p class="text-red-700 dark:text-red-300 text-sm">{{ error[0].toUpperCase() + error.slice(1) }}</p>
        </div>
      </div>
      
      <!-- Get Funds Button -->
      <div v-if="faucet.Address === '-'" class="text-center">
        <button @click="getSome" 
                class="btn-primary-modern text-lg px-8 py-3">
          <i class="fas fa-coins mr-2"></i>
          Get Testnet XAH
        </button>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Click to generate a new testnet account with XAH funds.
        </p>
      </div>
      
      <!-- Account Details -->
      <div v-if="faucet.Address !== '-'" class="space-y-4">
        
        <!-- Address -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <button @click="copyText(faucet.Address)" 
                    class="btn-secondary-modern text-xs">
              <i class="fas fa-copy mr-1"></i>
              Copy
            </button>
          </div>
          <a :href="link(faucet.Address)" 
             target="_blank" 
             class="block font-mono text-sm text-xahau-blue hover:text-xahau-blue-light break-all">
            {{ faucet.Address }}
            <i class="fas fa-external-link-alt ml-1 text-xs"></i>
          </a>
        </div>
        
        <!-- Secret -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Secret</label>
            <button @click="copyText(faucet.Secret)" 
                    class="btn-secondary-modern text-xs">
              <i class="fas fa-copy mr-1"></i>
              Copy
            </button>
          </div>
          <div class="font-mono text-sm text-gray-900 dark:text-gray-100 break-all bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border-l-4 border-yellow-400">
            {{ faucet.Secret }}
          </div>
        </div>
        
        <!-- Transaction Hash -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Transaction</label>
            <button @click="copyText(faucet.TX)" 
                    class="btn-secondary-modern text-xs">
              <i class="fas fa-copy mr-1"></i>
              Copy
            </button>
          </div>
          <a :href="link(faucet.TX)" 
             target="_blank" 
             class="block font-mono text-sm text-xahau-blue hover:text-xahau-blue-light break-all">
            {{ faucet.TX }}
            <i class="fas fa-external-link-alt ml-1 text-xs"></i>
          </a>
        </div>
        
        <!-- Balance and Result -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">XAH Balance</label>
            <div class="text-lg font-semibold text-green-600 dark:text-green-400">
              <i class="fas fa-coins mr-1"></i>
              {{ faucet.XRP }} XAH
            </div>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Status</label>
            <div class="text-lg font-semibold text-blue-600 dark:text-blue-400">
              <i class="fas fa-check-circle mr-1"></i>
              {{ faucet.Result }}
            </div>
          </div>
        </div>
        
        <!-- Debug Stream -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="flex justify-between items-start mb-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Debug Stream</label>
            <button @click="copyText('wss://xahau-test.net/debugstream/' + faucet.Address + '/')" 
                    class="btn-secondary-modern text-xs">
              <i class="fas fa-copy mr-1"></i>
              Copy
            </button>
          </div>
          <a :href="'https://xahau-test.net/debugstream/' + faucet.Address + '/'" 
             target="_blank" 
             class="block font-mono text-sm text-xahau-blue hover:text-xahau-blue-light break-all">
            wss://xahau-test.net/debugstream/{{ faucet.Address }}/
            <i class="fas fa-external-link-alt ml-1 text-xs"></i>
          </a>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Faucet',
  setup() {
    const error = ref('')
    const faucet = ref({
      Address: '-',
      Secret: '-',
      XRP: 0,
      TX: '-',
      Result: '-'
    })

    const link = (data) => {
      return 'https://explorer.xahau-test.net/' + data
    }

    const copyText = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    const getSome = async () => {
      try {
        const call = await window.fetch('https://xahau-test.net/newcreds', { 
          method: 'POST'
        })
        
        if (!call.ok) {
          throw new Error(`HTTP error! status: ${call.status}`)
        }
        
        const data = await call.json()

        if (typeof data?.error !== 'undefined') {
          error.value = data.error
        } else {
          error.value = ''
          faucet.value.Address = data.address
          faucet.value.Secret = data.secret
          faucet.value.XRP = data.xrp
          faucet.value.TX = data.hash
          faucet.value.Result = data.code
        }
      } catch (err) {
        console.error('Faucet request failed:', err)
        error.value = 'Failed to get testnet funds. Please try again later.'
      }
    }

    return {
      error,
      faucet,
      link,
      copyText,
      getSome
    }
  }
})
</script>

<style scoped>
/* Component-specific styles */
</style>
