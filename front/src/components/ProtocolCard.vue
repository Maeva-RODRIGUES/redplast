<script setup lang="ts">
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { protocolsApi } from '../api/protocolsApi'

interface Protocol {
  id: number
  title: string
  description: string
  author: string
  created_at: string
  icon: string
  category: string
}

const props = defineProps<{ protocol: Protocol }>()
const protocol = props.protocol


const formatDate = (created_at: string): string => {
  return format(new Date(created_at), "dd MMMM yyyy à HH:mm", { locale: fr })
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Collecte': 'badge-primary',
    'Alternatives': 'badge-secondary',
    'Réutilisation': 'badge-accent',
    'Analyse': 'badge-info',
    'Formation': 'badge-success',
    'Stérilisation': 'badge-warning'
  }
  return colors[category] || 'badge-neutral'
}
const emit = defineEmits<{
  (e: 'deleted', id: number): void
  (e: 'consult', id: number): void
  (e: 'edit', protocol: any): void
}>()


const onDelete = async (id: number) => {
  if (confirm('Voulez-vous vraiment supprimer ce protocole ?')) {
    await protocolsApi.delete(id)
    emit('deleted', id)
    alert('Protocole supprimé avec succès.')
  }
}

</script>

<template>
  <div class="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 hover:border-bordeaux-200 group">
    <div class="card-body p-6">
      <!-- Header avec icône et catégorie -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gradient-to-br from-bordeaux-100 to-framboise-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
            {{ protocol.icon }}
          </div>
          <div class="flex-1">
            <div :class="`badge ${getCategoryColor(protocol.category)} badge-sm text-xs font-medium`">
              {{ protocol.category }}
            </div>
          </div>
        </div>
        <button
          class="btn btn-ghost btn-xs"
           @click="$emit('edit', protocol)"
          title="Modifier"
          style="font-size: 1rem;"
        >
          ✏️
      </button>
       
      </div>

      <!-- Titre -->
      <h3 class="card-title text-lg font-bold text-neutral leading-tight mb-3 group-hover:text-bordeaux-700 transition-colors duration-300">
        {{ protocol.title }}
      </h3>

      <!-- Description -->
      <p class="line-clamp-2 text-neutral/70 text-sm leading-relaxed mb-4 flex-grow">
        {{ protocol.description }}
      </p>

      <!-- Footer avec auteur et date -->
      <div class="flex items-center justify-between pt-4 border-t border-base-200">
        <div class="flex items-center space-x-2">
          <div class="avatar placeholder">
            <div class="bg-gradient-to-br from-bordeaux-500 to-framboise-500 text-white rounded-full w-8 h-8">
              <span class="text-xs font-medium">
                {{ protocol.author.split(' ').map(n => n[0]).join('') }}
              </span>
            </div>
          </div>
          <div>
            <p class="text-sm font-medium text-neutral">{{ protocol.author }}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-xs text-neutral/50">{{ formatDate(protocol.created_at) }}</p>
        </div>
      </div>

      <!-- Action des boutons -->
      <div class="card-actions justify-end mt-4 pt-2">
        <button 
        class="btn btn-sm btn-primary text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        @click="$emit('consult', protocol.id)"
        >  
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Consulter
        </button>
         <button
          class="btn btn-sm btn-ghost text-error"
          @click="onDelete(protocol.id)"
          title="Supprimer"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>