<template>
  <section class="p-4">
    <h1 class="text-2xl font-bold mb-4">Liste des protocoles 🔬</h1>

    <div v-if="loading" class="text-gray-500">Chargement des données...</div>
    <div v-else-if="error" class="text-red-600">Erreur : {{ error }}</div>
    <ul v-else class="space-y-2">
      <li
        v-for="protocol in protocols"
        :key="protocol.id"
        class="bg-gray-100 p-3 rounded shadow"
      >
        <h2 class="font-semibold">{{ protocol.title }}</h2>
        <p class="text-sm text-gray-700">{{ protocol.description }}</p>
        <p class="text-xs text-gray-500">
          Auteur : {{ protocol.author }} · Créé le :
          {{ new Date(protocol.created_at).toLocaleDateString() }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Protocol {
  id: number
  title: string
  description: string
  author: string
  created_at: string
}

const protocols = ref<Protocol[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/protocols/')
    if (!res.ok) throw new Error('Erreur lors du chargement')
    protocols.value = await res.json()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>

section {
  max-width: 700px;
  margin: 0 auto;
}
</style>
