<script setup lang="ts">
interface Protocol {
  id: number
  title: string
  description: string
  author: string
  date: string
  icon: string
  category: string
}

defineProps<{
  protocol: Protocol
}>()

import { parse, format } from 'date-fns'
import { fr } from 'date-fns/locale'

const formatDate = (created_at: string) => {
  if (!created_at) return 'Date inconnue'

  try {
    // Format d'entrée : "June 16, 2025, 5:06 p.m."
    const parsed = parse(created_at, "MMMM d, yyyy, h:mm a", new Date(), { locale: fr })

    return format(parsed, "dd MMMM yyyy 'à' HH:mm", { locale: fr }) // => 16 juin 2025 à 17:06
  } catch {
    return 'Date invalide'
  }
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
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-xs">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a class="text-sm">📄 Voir le protocole</a></li>
            <li><a class="text-sm">📥 Télécharger PDF</a></li>
            <li><a class="text-sm">💬 Commenter</a></li>
          </ul>
        </div>
      </div>

      <!-- Titre -->
      <h3 class="card-title text-lg font-bold text-neutral leading-tight mb-3 group-hover:text-bordeaux-700 transition-colors duration-300">
        {{ protocol.title }}
      </h3>

      <!-- Description -->
      <p class="text-neutral/70 text-sm leading-relaxed mb-4 flex-grow">
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
          <p class="text-xs text-neutral/50">{{ formatDate(protocol.date) }}</p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="card-actions justify-end mt-4 pt-2">
        <button class="btn btn-sm btn-primary text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Consulter
        </button>
      </div>
    </div>
  </div>
</template>