<template>
  <div class="protocols">
    <h1>📋 Protocoles de laboratoire</h1>
    <div v-if="protocols.length === 0">Aucun protocole disponible.</div>
    <ul v-else>
      <li v-for="protocol in sortedProtocols" :key="protocol.id" class="protocol-item">
        <div class="emoji">📄</div>
        <div class="content">
          <h2>{{ protocol.title }}</h2>
          <span class="author-badge">👤 {{ protocol.author }}</span>
          <small class="date">🕒 {{ formatDate(protocol.created_at) }}</small>
          <p>{{ protocol.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const protocols = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/protocols/')
    protocols.value = response.data
  } catch (error) {
    console.error('Erreur de récupération :', error)
  }
})

const sortedProtocols = computed(() => {
  return [...protocols.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.protocols {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
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
