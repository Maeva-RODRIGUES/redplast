<template>
  <!-- Modal backdrop -->
  <div 
    v-if="isOpen" 
    class="modal modal-open"
    @click.self="closeModal"
  >
    <div class="modal-box relative max-w-2xl bg-white shadow-2xl">
      <!-- Header avec animation -->
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-gradient-to-br from-bordeaux-500 to-framboise-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <span class="text-white text-3xl">🎭</span>
        </div>
        <h3 class="text-2xl font-bold text-neutral mb-2">
          Oups ! Petit secret révélé... 🤫
        </h3>
        <div class="badge badge-primary badge-lg">
          Plot twist !
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="space-y-6">
        <!-- Message principal -->
        <div class="bg-gradient-to-r from-bordeaux-50 to-framboise-50 rounded-lg p-6 border border-bordeaux-200">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-bordeaux-100 to-framboise-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🔬</span>
            </div>
            <div>
              <h4 class="font-bold text-bordeaux-700 mb-2">
                Ce projet est en réalité... ma candidature ! 🎯
              </h4>
              <p class="text-neutral leading-relaxed">
                Surprise ! Plutôt que d'envoyer un CV classique, j'ai préféré créer cette interface 
                complète pour démontrer mes compétences en développement web. 
                <strong>Redplast</strong> n'existe pas (encore ?), mais mon expertise, elle, est bien réelle !
              </p>
            </div>
          </div>
        </div>

        <!-- Compétences démontrées -->
        <div class="bg-white rounded-lg border border-base-200 p-6">
          <h4 class="font-bold text-neutral mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-bordeaux-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Ce que ce projet démontre :
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="flex items-center space-x-2">
              <div class="badge badge-success badge-sm">✓</div>
              <span class="text-sm">Vue.js 3 + TypeScript</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="badge badge-success badge-sm">✓</div>
              <span class="text-sm">Django REST Framework</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="badge badge-success badge-sm">✓</div>
              <span class="text-sm">Design System (Tailwind + DaisyUI)</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="badge badge-success badge-sm">✓</div>
              <span class="text-sm">Architecture Full-Stack</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="badge badge-success badge-sm">✓</div>
              <span class="text-sm">UX/UI moderne et responsive</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="badge badge-success badge-sm">✓</div>
              <span class="text-sm">Créativité dans l'approche</span>
            </div>
          </div>
        </div>

        <!-- Call to action -->
        <div class="bg-gradient-to-r from-bordeaux-600 to-framboise-600 rounded-lg p-6 text-white text-center">
          <h4 class="font-bold text-lg mb-2">
            Intéressé(e) par mon profil ? 🚀
          </h4>
          <p class="text-white/90 mb-4">
            Si cette approche créative vous a plu et que mes compétences correspondent à vos besoins, 
            n'hésitez pas à me contacter !
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="mailto:maeva.rodrigues1@gmail.com" 
              class="btn bg-white text-bordeaux-700 hover:bg-base-200 border-none shadow-lg hover:scale-105 transition-all duration-300"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              Me contacter par email
            </a>
            <a 
              href="https://www.linkedin.com/in/maeva-rodrigues-sapfiori/" 
              target="_blank"
              class="btn btn-outline text-white border-white hover:bg-white hover:text-bordeaux-700"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
              </svg>
              Voir mon LinkedIn
            </a>
          </div>
        </div>

        <!-- Note humoristique -->
        <div class="text-center">
          <p class="text-sm text-neutral/60 italic">
            PS : Si vous voulez vraiment créer des protocoles, il faudra d'abord m'embaucher ! 😄
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-action mt-8 pt-6 border-t border-base-200">
        <button 
          @click="closeModal"
          class="btn btn-ghost"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Fermer (et garder le secret 🤐)
        </button>
        <button 
          @click="closeModal"
          class="btn btn-primary text-white"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
          J'ai compris !
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  isOpen: boolean
}

defineProps<Props>()

// Émissions
const emit = defineEmits<{
  close: []
}>()

// Fonctions
const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
/* Animation personnalisée pour l'icône */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Effet de gradient animé */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>