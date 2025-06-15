<template>
  <div class="container">
    <h1 class="title">📄 Protocoles de laboratoire</h1>
    <div v-if="protocols.length === 0">Aucun protocole disponible.</div>
    <div v-else class="protocol-list">
      <div v-for="protocol in sortedProtocols" :key="protocol.id" class="protocol-card">
        <div class="protocol-header">
          <span class="emoji">🧪</span>
          <h2 class="protocol-title">{{ protocol.title }}</h2>
          <span class="badge">{{ protocol.author }}</span>
        </div>
        <p class="protocol-description">{{ protocol.description }}</p>
        <small class="protocol-date">
          🗓️ Créé le : {{ formatDate(protocol.created_at) }}
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/api/axios'


const protocols = ref([])

const fetchProtocols = async () => {
  try {
    const response = await api.get('protocols/')
    protocols.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des protocoles :', error)
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const sortedProtocols = computed(() => {
  return [...protocols.value].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )
})

onMounted(() => {
  fetchProtocols()
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}

.protocol-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.protocol-card {
  background-color: #f5f5f5;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.protocol-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.protocol-title {
  flex-grow: 1;
  font-size: 1.3rem;
  margin: 0;
}

.emoji {
  font-size: 1.6rem;
}

.badge {
  background-color: #4caf50;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

.protocol-description {
  margin: 0.8rem 0;
  line-height: 1.5;
}

.protocol-date {
  font-size: 0.85rem;
  color: #666;
}
</style>
