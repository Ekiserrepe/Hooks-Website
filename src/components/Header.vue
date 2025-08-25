<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm transition-theme">
    <!-- Navigation Bar -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl sm:text-2xl font-bold text-xahau-blue dark:text-xahau-blue-light">
            Xahau Faucet
          </h1>
          <span class="badge-warning-modern text-xs font-medium">
            Testnet
          </span>
        </div>
        
        <div class="flex items-center space-x-3">
          <!-- Desktop buttons (hidden on mobile) -->
          <div class="hidden md:flex items-center space-x-3">
            <a href="https://xahau.network" 
               target="_blank" 
               class="btn-warning-modern text-sm">
              Official Website
            </a>
            <a href="https://discord.gg/ds7nb93mYj" 
               target="_blank" 
               class="btn-primary-modern text-sm">
              Xahau Discord
            </a>
            <a href="https://x.com/xahaunetwork" 
               target="_blank" 
               class="btn-primary-modern text-sm">
              X/Twitter
            </a>
          </div>
          
          <!-- Theme toggle (always visible) -->
          <button @click="toggleTheme" 
                  class="btn-secondary-modern p-2">
            <i class="fas" :class="isDark ? 'fa-sun' : 'fa-moon'"></i>
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Navigation Links -->
    <div class="border-t border-gray-200 dark:border-gray-700">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8 overflow-x-auto py-3">
          <div class="relative">
            <button ref="explorersButton" 
                    @click="toggleExplorersMenu" 
                    class="whitespace-nowrap text-sm font-medium text-xahau-blue hover:text-xahau-blue-light transition-colors flex items-center">
              Explorers
              <i class="fas fa-chevron-down ml-1 text-xs" :class="{ 'rotate-180': showExplorersMenu }"></i>
            </button>
          </div>
          <a href="https://docs.xahau.network/" 
             target="_blank" 
             class="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            Docs
          </a>
          <a href="https://github.com/xahau" 
             target="_blank" 
             class="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center">
            <i class="fab fa-github mr-2"></i> Github
          </a>
        </div>
      </nav>
    </div>
    
    <!-- Dropdown Menu - Fixed position portal -->
    <Teleport to="body">
      <div v-if="showExplorersMenu" 
           data-dropdown
           :style="{ top: dropdownPosition.top + 'px', left: dropdownPosition.left + 'px' }"
           class="fixed w-56 bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700"
           style="z-index: 9999;">
        <div class="py-1">
          <a href="https://explorer.xahau-test.net/" 
             target="_blank" 
             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Technical Explorer
          </a>
          <a href="https://test.xahauexplorer.com/" 
             target="_blank" 
             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            XahauExplorer
          </a>
          <a href="https://xahau-testnet.xrplwin.com/" 
             target="_blank" 
             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            XRPLWin
          </a>
          <a href="https://xahscan.com/" 
             target="_blank" 
             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            XAHScan (No Testnet)
          </a>
        </div>
      </div>
    </Teleport>
  </header>
  
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hooks Builder Card -->
    <div class="card-modern mb-8">
      <div class="card-header-modern">
        <div class="flex items-center space-x-4">
          <svg width="48px" height="48px" viewBox="0 0 294 283" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
            <path fill-rule="evenodd" clip-rule="evenodd" id="path" d="M265.827 235L172.416 141.589L265.005 49H226.822L147.732 128.089H53.5514L27.4824 155.089H147.732L227.643 235H265.827Z" fill="#9D2DFF"></path>
          </svg>
          <div class="flex-grow">
            <h2 class="text-lg font-semibold">Hooks Builder</h2>
            <p class="text-blue-100 text-sm">Develop, test and deploy your Hooks in the browser</p>
          </div>
        </div>
      </div>
      <div class="card-body-modern">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              With Hooks Builder you can develop, test, debug and deploy your own Hooks on testnet, 
              using our examples or building your own from scratch. Create smart contracts directly 
              in your browser with our powerful online IDE.
            </p>
          </div>
          <div class="flex items-center justify-center md:justify-end">
            <a href="https://builder.xahau.network" 
               target="_blank" 
               class="btn-warning-modern w-full md:w-auto text-center">
              Start building 
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    
  </main>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    const isDark = ref(false)
    const showExplorersMenu = ref(false)
    const explorersButton = ref(null)
    const dropdownPosition = ref({ top: 0, left: 0 })
    
    const toggleTheme = () => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
    
    const toggleExplorersMenu = () => {
      if (!showExplorersMenu.value && explorersButton.value) {
        // Calculate position when opening
        const rect = explorersButton.value.getBoundingClientRect()
        dropdownPosition.value = {
          top: rect.bottom + 4, // 4px margin
          left: rect.left
        }
      }
      showExplorersMenu.value = !showExplorersMenu.value
    }
    
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
      document.documentElement.classList.toggle('dark', isDark.value)
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.relative') && !e.target.closest('[data-dropdown]')) {
          showExplorersMenu.value = false
        }
      })
    })
    
    return {
      isDark,
      showExplorersMenu,
      explorersButton,
      dropdownPosition,
      toggleTheme,
      toggleExplorersMenu
    }
  }
})
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
