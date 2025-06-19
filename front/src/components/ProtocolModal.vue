<template>
  <!-- Modal backdrop -->
  <div 
    v-if="isOpen" 
    class="modal modal-open"
    @click.self="closeModal"
  >
    <div class="modal-box relative max-w-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-bordeaux-500 to-framboise-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-xl">📝</span>
          </div>
          <h3 class="text-xl font-bold text-neutral">
            {{ isEditMode ? 'Modifier le protocole' : 'Nouveau protocole' }}
          </h3>
        </div>
        <button 
          @click="closeModal"
          class="btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Titre -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Titre du protocole *</span>
          </label>
            <input 
              v-model="form.title"
              type="text" 
              placeholder="Ex: Protocole de collecte des déchets plastiques"
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.title }"
              required
            />
          <label v-if="errors.title" class="label">
            <span class="label-text-alt text-error">{{ errors.title }}</span>
          </label>
        </div>

        <!-- Description -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Description *</span>
          </label>
          <textarea 
            v-model="form.description"
            placeholder="Décrivez en détail la méthodologie et les étapes du protocole..."
            class="textarea textarea-bordered h-32 w-full"
            :class="{ 'textarea-error': errors.description }"
            required
          ></textarea>
          <label v-if="errors.description" class="label">
            <span class="label-text-alt text-error">{{ errors.description }}</span>
          </label>
        </div>

      

        <!-- Auteur-->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Auteur *</span>
          </label>
            <input 
              v-model="form.author"
              type="text"
              placeholder="Ex: Dr. Claire Moreau"
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.author }"
              required
            />
            <label v-if="errors.author" class="label">
              <span class="label-text-alt text-error">{{ errors.author }}</span>
            </label>
        </div>

        <!-- Catégorie -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Catégorie *</span>
          </label>
          <select 
            v-model="form.category"
            class="select select-bordered w-full"
            :class="{ 'select-error': errors.category }"
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Collecte">Collecte</option>
            <option value="Alternatives">Alternatives</option>
            <option value="Réutilisation">Réutilisation</option>
            <option value="Analyse">Analyse</option>
            <option value="Formation">Formation</option>
            <option value="Stérilisation">Stérilisation</option>
          </select>
          <label v-if="errors.category" class="label">
            <span class="label-text-alt text-error">{{ errors.category }}</span>
          </label>
        </div>

        <!-- Icône -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Icône (optionnel)</span>
          </label>
          <input 
            v-model="form.icon"
            type="text" 
            placeholder="🧪 (emoji ou caractère)"
            class="input input-bordered w-full"
            maxlength="10"
          />
          <label class="label">
            <span class="label-text-alt">Utilisez un emoji ou un caractère pour représenter visuellement le protocole</span>
          </label>
        </div>

        <!-- Messages -->
        <div v-if="successMessage" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>

        <div v-if="errorMessage" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Actions -->
        <div class="modal-action">
          <button 
            type="button"
            @click="closeModal"
            class="btn btn-ghost"
            :disabled="isLoading"
          >
            Annuler
          </button>
        <button 
          type="submit"
          class="btn btn-primary text-white"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
          <span v-else>
            {{ isEditMode ? 'Enregistrer les modifications' : 'Créer le protocole' }}
          </span>
          <span v-if="isLoading">
            {{ isEditMode ? 'Enregistrement...' : 'Création...' }}
          </span>
        </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { protocolsApi } from '../api/protocolsApi'
import { computed } from '@vue/reactivity';


// Props
interface Props {
  isOpen: boolean
  initialProtocol?: any
}

const props = defineProps<Props>()
const isEditMode = computed(() => !!props.initialProtocol)

// Emits
const emit = defineEmits<{
  close: []
  protocolCreated: []
  protocolUpdated: []
}>()

// État du formulaire
const form = ref({
  title: '',
  description: '',
  category: '',
  icon: '🧪',
  author: ''
})

// Fonctions
const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    category: '',
    icon: '🧪',
    author: ''
  }
  errors.value = {}
  successMessage.value = ''
  errorMessage.value = ''
  isLoading.value = false
}

// État de l'interface
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = ref<Record<string, string>>({})

// Réinitialiser le formulaire quand la modal s'ouvre
watch(
  () => props.initialProtocol,
  (protocol) => {
    if (protocol) {
      console.log('Catégorie reçue :', protocol.category)
      form.value = {
        title: protocol.title || '',
        description: protocol.description || '',
        category: protocol.category || '',
        icon: protocol.icon || '🧪',
        author: protocol.author || ''
      }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const closeModal = () => {
  emit('close')
}

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.title.trim()) {
    errors.value.title = 'Le titre est obligatoire'
  }
  
  if (!form.value.description.trim()) {
    errors.value.description = 'La description est obligatoire'
  }
  
  if (!form.value.category) {
    errors.value.category = 'La catégorie est obligatoire'
  }

  if (!form.value.author.trim()) {
  errors.value.author = 'Le nom de l’auteur est obligatoire'
}

  
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const dataToSend = {
      title: form.value.title.trim(),
      description: form.value.description.trim(),
      category: form.value.category,
      icon: form.value.icon.trim() || '🧪',
      author: form.value.author.trim(),
      date: new Date().toISOString()
    }

       if (props.initialProtocol && props.initialProtocol.id) {
      // Mode édition
      await protocolsApi.update(props.initialProtocol.id, dataToSend)
      successMessage.value = 'Protocole modifié avec succès !'
      emit('protocolUpdated')
    } else {
      // Mode création
      await protocolsApi.create(dataToSend)
      successMessage.value = 'Protocole créé avec succès !'
      emit('protocolCreated')
    }

    // Fermer la modal après un délai
    setTimeout(() => {
      closeModal()
    }, 1500)
  } catch (error: any) {
    console.error('Erreur lors de la création/modification du protocole:', error)
    if (error.response?.data) {
      const backendErrors = error.response.data
      if (typeof backendErrors === 'object') {
        errors.value = backendErrors
      } else {
        errorMessage.value = 'Erreur lors de la création/modification du protocole'
      }
    } else {
      errorMessage.value = 'Erreur de connexion au serveur'
    }
  } finally {
    isLoading.value = false
  }
}

</script>