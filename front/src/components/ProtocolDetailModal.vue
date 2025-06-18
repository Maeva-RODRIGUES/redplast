<!-- filepath: src/components/ProtocolDetailModal.vue -->
<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</button>
      <h3 class="font-bold text-lg">{{ protocol.title }}</h3>
      <p class="mt-2">{{ protocol.description }}</p>
      <p class="mt-2"><strong>Auteur :</strong> {{ protocol.author }}</p>
      <p class="mt-2"><strong>Catégorie :</strong> {{ protocol.category }}</p>
      <p class="mt-2"><strong>Date :</strong> {{ protocol.date }}</p>
      <p class="mt-2"><strong>Icône :</strong> {{ protocol.icon }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ protocol: any }>()
</script>