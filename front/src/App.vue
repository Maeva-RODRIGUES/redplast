<script setup lang="ts">
import { ref } from 'vue'
import ProtocolList from './components/ProtocolList.vue'
import ProtocolModal from './components/ProtocolModal.vue'
import type { Protocol } from './types/protocol'

const showModal = ref(false)
const protocolToEdit = ref<Protocol | null>(null)
const protocolListRef = ref()

function openCreateModal() {
  protocolToEdit.value = null
  showModal.value = true
}

function openEditModal(protocol: Protocol) {
  console.log('openEditModal appelé', protocol)
  protocolToEdit.value = protocol
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  protocolToEdit.value = null
}

const onProtocolCreated = () => {
  showModal.value = false
  protocolListRef.value?.loadProtocols()
}

function onProtocolUpdated() {
  closeModal()
  protocolListRef.value?.loadProtocols()
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-base-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center flex-wrap gap-4">
          <!-- Logo + Infos -->
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-bordeaux-600 to-framboise-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-2xl">♻️</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-neutral">
                Red<span class="text-bordeaux-700">plast</span>
              </h1>
              <p class="text-sm text-neutral/70 font-medium">Université de Bordeaux</p>
            </div>
          </div>

          <!-- Bouton ➕ -->
          <button
            @click="openCreateModal"
            class="btn btn-sm btn-primary text-white shadow-md hover:scale-105 hover:shadow-lg transition-all"
          >
            ➕ Nouveau protocole
          </button>
        </div>

        <p class="mt-4 text-neutral/80 max-w-2xl">
          Accompagner la réduction de l'usage du plastique en laboratoire de recherche
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <ProtocolList ref="protocolListRef" @edit="openEditModal" />
    </main>


    <!-- Modal de création-->
    <ProtocolModal 
      v-if="showModal"
       :isOpen="showModal"
      :initial-protocol="protocolToEdit"
      @close="closeModal"
      @protocolCreated="onProtocolCreated"
      @protocolUpdated="onProtocolUpdated"
    />
     

    <!-- Footer -->
    <footer class="bg-white border-t border-base-300 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-neutral/60 text-sm">
          <p>&copy; 2025 Redplast - Université de Bordeaux. Projet de recherche pour la réduction du plastique en laboratoire.</p>
          <p>Conçu avec ❤️ par Maëva Rodrigues</p>
        </div>
      </div>
    </footer>
  </div>
</template>
