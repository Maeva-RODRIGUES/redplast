<template>
  <div class="space-y-8">
    <!-- Section Header -->
    <div class="text-center space-y-4">
      <h2 class="text-4xl font-bold text-neutral">
        Protocoles de recherche
      </h2>
      <p class="text-lg text-neutral/70 max-w-3xl mx-auto">
        Découvrez nos protocoles scientifiques validés pour réduire l'empreinte plastique dans vos laboratoires de recherche
      </p>
      <div class="flex justify-center">
        <div class="stats stats-horizontal shadow-lg bg-white">
          <div class="stat">
            <div class="stat-figure text-bordeaux-600">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="stat-title text-neutral/60">Protocoles validés</div>
            <div class="stat-value text-bordeaux-700">{{ protocols.length }}</div>
          </div>
          <div class="stat">
            <div class="stat-figure text-framboise-600">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
              </svg>
            </div>
            <div class="stat-title text-neutral/60">Chercheurs contributeurs</div>
            <div class="stat-value text-framboise-700">6</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Protocols Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <ProtocolCard 
        v-for="protocol in sortedProtocols" 
        :key="protocol.id"
        :protocol="protocol"
       @deleted="loadProtocols"
       @consult="showProtocol"
       @edit="openEditModal(protocol.id)"
      />
    </div>

    <!-- Modale de détail du protocole (consultation protocole en entier) -->
   <ProtocolDetailModal 
     v-if="selectedProtocol"
    :protocol="selectedProtocol"
    @close="selectedProtocol = null"
    />

    <!-- Modale d'édition de protocole -->
    <ProtocolModal
      v-if="isEditModalOpen"
    :is-open="isEditModalOpen"
    :initial-protocol="protocolToEdit"
    @close="closeEditModal"
    @protocolUpdated="handleProtocolUpdated"
    />

    <!-- Modal humoristique -->
    <div v-if="isMotivationModalOpen" class="modal modal-open" @click.self="closeMotivationModal">
    <div class="modal-box max-w-lg text-center">
      <h3 class="font-bold text-2xl mb-4">😄 Merci pour votre enthousiasme !</h3>
      <p class="mb-6">
        Pour l’instant, la meilleure proposition serait… de m’intégrer à votre équipe&nbsp;😉<br>
        <span class="text-sm text-neutral-500">Contactez-moi pour en discuter !</span>
      </p>
      <button class="btn btn-primary" @click="closeMotivationModal">Fermer</button>
    </div>
  </div>


    <!-- CTA -->
    <div class="bg-gradient-to-r from-bordeaux-600 to-framboise-600 rounded-2xl p-8 text-white text-center shadow-xl">
      <h3 class="text-2xl font-bold mb-4">Contribuez à la recherche durable</h3>
      <p class="text-lg mb-6 text-white/90">
        Rejoignez notre communauté de chercheurs engagés pour un laboratoire plus respectueux de l'environnement
      </p>
      <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <button class="btn btn-lg bg-white text-bordeaux-700 hover:bg-base-200 border-none shadow-lg"
        @click="openMotivationModal"
        >
          Proposer un protocole
        </button>
        <button class="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-bordeaux-700">
          En savoir plus
        </button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import ProtocolCard from './ProtocolCard.vue'
import ProtocolDetailModal from './ProtocolDetailModal.vue'
import ProtocolModal from './ProtocolModal.vue'
import { protocolsApi } from '../api/protocolsApi'

const protocols = ref([])
const selectedProtocol = ref(null)
const isEditModalOpen = ref(false)
const protocolToEdit = ref(null)

const isMotivationModalOpen = ref(false)

function openMotivationModal() {
  isMotivationModalOpen.value = true
}
function closeMotivationModal() {
  isMotivationModalOpen.value = false
}

async function openEditModal(protocolId) {
  // Récupère le protocole à jour depuis l’API
  const response = await protocolsApi.get(protocolId)
  protocolToEdit.value = response.data
  isEditModalOpen.value = true
}

const emit = defineEmits(['protocolCreated'])

const loadProtocols = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/protocols/')
    protocols.value = response.data
  } catch (error) {
    console.error('Erreur de récupération :', error)
  }
}


const showProtocol = async (id) => {
  const response = await protocolsApi.get(id)
  selectedProtocol.value = response.data
}

// const openEditModal = (protocol) => {
//   protocolToEdit.value = protocol
//   isEditModalOpen.value = true
// }

const closeEditModal = () => {
  isEditModalOpen.value = false
  protocolToEdit.value = null
}

const handleProtocolUpdated = () => {
  loadProtocols()
  closeEditModal()
}


onMounted(loadProtocols)

// refresh si besoin
defineExpose({ loadProtocols })

const sortedProtocols = computed(() => {
  return [...protocols.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})
</script>

<style scoped>
.protocols {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem; 
  font-weight: bold;
  margin-bottom: 1.8rem;
  margin-left: -8rem;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

.protocol-item {
  display: flex;
  align-items: flex-start;
  background: #f9f9f9;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.emoji {
  font-size: 2rem;
  margin-right: 1rem;
}

.content {
  flex: 1;
}

h2 {
  margin: 0 0 0.5rem;
}

.author-badge {
  display: inline-block;
  background: #dbeafe;
  color: #1d4ed8;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.date {
  display: block;
  font-size: 0.75rem;
  color: #555;
  margin-bottom: 0.5rem;
}
</style>
