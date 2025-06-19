
<template>
 <div class="modal modal-open" @click.self="closeModal">
    <div class="modal-box relative max-w-3xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
      <!-- Zone d'export PDF -->
      <div ref="pdfContent" class="pdf-content">
        <!-- En-tête du document -->
        <header class="border-b-2 border-bordeaux-200 pb-6 mb-8">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-bordeaux-600 to-framboise-600 rounded-lg flex items-center justify-center shadow-lg">
                <span class="text-white text-2xl">{{ protocol?.icon || '🧪' }}</span>
              </div>
              <div>
                <div class="badge badge-primary badge-sm text-xs font-medium mb-2">
                  {{ getCategoryLabel(protocol?.category || '') }}
                </div>
                <h1 class="text-2xl font-bold text-neutral leading-tight">
                  {{ protocol?.title }}
                </h1>
              </div>
            </div>
            <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost no-print">✕</button>
          </div>

          <div class="bg-base-50 rounded-lg p-4 border border-base-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="flex items-center space-x-2">
                <div class="avatar placeholder">
                  <div class="bg-gradient-to-br from-bordeaux-500 to-framboise-500 text-white rounded-full w-8 h-8">
                    <span class="text-xs font-medium">
                      {{ getAuthorInitials(protocol?.author) }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="font-medium text-neutral">{{ protocol?.author?.full_name || protocol.author }}</p>
                  <p class="text-neutral/60 text-xs">Auteur du protocole</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-bordeaux-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-bordeaux-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-neutral">{{ formattedDate }}</p>
                  <p class="text-neutral/60 text-xs">Date de création</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="prose prose-lg max-w-none">
          <section class="mb-8">
            <h2 class="text-xl font-bold text-bordeaux-700 mb-4">Description du protocole</h2>
            <div class="bg-white rounded-lg border border-base-200 p-6">
              <p class="text-neutral leading-relaxed text-justify whitespace-pre-line">
                {{ protocol?.description }}
              </p>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-bold text-bordeaux-700 mb-4">Informations techniques</h2>
            <div class="bg-base-50 rounded-lg border border-base-200 p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-semibold text-neutral mb-2">Catégorie</h3>
                  <div class="flex items-center space-x-2">
                    <div :class="`badge ${getCategoryColor(protocol?.category || '')} badge-lg`">
                      {{ getCategoryLabel(protocol?.category || '') }}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-neutral mb-2">Identifiant</h3>
                  <p class="text-neutral/70 font-mono text-sm">PROT-{{ protocol?.id?.toString().padStart(4, '0') }}</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer class="border-t-2 border-bordeaux-200 pt-6 mt-8">
          <div class="text-center text-sm text-neutral/60">
            <p class="mb-2"><strong>Redplast</strong> - Projet de l'Université de Bordeaux</p>
            <p>Réduction de l'usage du plastique en laboratoire de recherche</p>
          </div>
        </footer>
      </div>

      <div class="modal-action no-print mt-8 pt-6 border-t border-base-200">
        <button @click="closeModal" class="btn btn-ghost">Fermer</button>
        <button @click="generatePDF" class="btn btn-primary text-white" :disabled="isGeneratingPDF">
          <span v-if="isGeneratingPDF" class="loading loading-spinner loading-sm mr-2"></span>
          Télécharger en PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// @ts-ignore
import html2pdf from 'html2pdf.js'

const props = defineProps<{ protocol: any }>()
const protocol = props.protocol

const emit = defineEmits(['close'])

const pdfContent = ref<HTMLElement>()
const isGeneratingPDF = ref(false)

const formattedDate = computed(() => {
  if (!protocol?.date) return ''
  const date = new Date(protocol.date)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const closeModal = () => {
  emit('close')
}

const generatePDF = async () => {
  if (!pdfContent.value) return
  isGeneratingPDF.value = true
  try {
    await html2pdf().set({
      margin: [10, 10, 10, 10],
      filename: `protocole-${protocol.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(pdfContent.value).save()
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error)
  } finally {
    isGeneratingPDF.value = false
  }
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'collecte': 'Collecte',
    'alternatives': 'Alternatives',
    'reutilisation': 'Réutilisation',
    'analyse': 'Analyse',
    'formation': 'Formation',
    'sterilisation': 'Stérilisation'
  }
  return labels[category] || category
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'collecte': 'badge-primary',
    'alternatives': 'badge-secondary',
    'reutilisation': 'badge-accent',
    'analyse': 'badge-info',
    'formation': 'badge-success',
    'sterilisation': 'badge-warning'
  }
  return colors[category] || 'badge-neutral'
}

const getAuthorInitials = (author: any) => {
  if (!author) return '??'
  if (author.first_name && author.last_name) return `${author.first_name[0]}${author.last_name[0]}`
  return author.substring(0, 2).toUpperCase()
}
</script>

<style scoped>
@media print {
  .no-print { display: none !important; }
}

.pdf-content {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #374151;
}

.pdf-content h1,
.pdf-content h2,
.pdf-content h3 {
  color: #991b1b;
}

.pdf-content .prose { max-width: none; }
.pdf-content .prose p { margin-bottom: 1rem; text-align: justify; }

.pdf-content .badge {
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.pdf-content section {
  break-inside: avoid;
  page-break-inside: avoid;
}

.pdf-content header {
  break-after: avoid;
  page-break-after: avoid;
}
</style>
