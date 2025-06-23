import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import ProtocolCard from './ProtocolCard.vue';
import ProtocolDetailModal from './ProtocolDetailModal.vue';
import ProtocolModal from './ProtocolModal.vue';
import MotivationModal from './MotivationModal.vue';
import { protocolsApi } from '../api/protocolsApi';
const protocols = ref([]);
const selectedProtocol = ref(null);
const isEditModalOpen = ref(false);
const protocolToEdit = ref(null);
const isMotivationModalOpen = ref(false);
const contributorCount = computed(() => {
    const authors = protocols.value.map(p => p.author);
    return new Set(authors).size;
});
function openMotivationModal() {
    isMotivationModalOpen.value = true;
}
function closeMotivationModal() {
    isMotivationModalOpen.value = false;
}
async function openEditModal(protocolId) {
    // Récupère le protocole à jour depuis l’API
    const response = await protocolsApi.get(protocolId);
    protocolToEdit.value = response.data;
    isEditModalOpen.value = true;
}
const emit = defineEmits(['edit', 'protocolCreated']);
function handleEdit(protocol) {
    openEditModal(protocol.id);
    // emit('edit', protocol)
}
const loadProtocols = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/protocols/');
        protocols.value = response.data;
    }
    catch (error) {
        console.error('Erreur de récupération :', error);
    }
};
const showProtocol = async (id) => {
    const response = await protocolsApi.get(id);
    selectedProtocol.value = response.data;
};
const closeEditModal = () => {
    isEditModalOpen.value = false;
    protocolToEdit.value = null;
};
const handleProtocolUpdated = () => {
    loadProtocols();
    closeEditModal();
};
onMounted(loadProtocols);
// refresh si besoin
const __VLS_exposed = { loadProtocols };
defineExpose(__VLS_exposed);
const sortedProtocols = computed(() => {
    return [...protocols.value].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center space-y-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-4xl font-bold text-neutral" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-lg text-neutral/70 max-w-3xl mx-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stats stats-horizontal shadow-lg bg-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat-figure text-bordeaux-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "w-8 h-8" },
    fill: "currentColor",
    viewBox: "0 0 20 20",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat-title text-neutral/60" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat-value text-bordeaux-700" },
});
(__VLS_ctx.protocols.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat-figure text-framboise-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "w-8 h-8" },
    fill: "currentColor",
    viewBox: "0 0 20 20",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat-title text-neutral/60" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stat-value text-framboise-700" },
});
(__VLS_ctx.contributorCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" },
});
for (const [protocol] of __VLS_getVForSourceType((__VLS_ctx.sortedProtocols))) {
    /** @type {[typeof ProtocolCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ProtocolCard, new ProtocolCard({
        ...{ 'onDeleted': {} },
        ...{ 'onConsult': {} },
        ...{ 'onEdit': {} },
        key: (protocol.id + '-' + protocol.updated_at),
        protocol: (protocol),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onDeleted': {} },
        ...{ 'onConsult': {} },
        ...{ 'onEdit': {} },
        key: (protocol.id + '-' + protocol.updated_at),
        protocol: (protocol),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onDeleted: (__VLS_ctx.loadProtocols)
    };
    const __VLS_7 = {
        onConsult: (__VLS_ctx.showProtocol)
    };
    const __VLS_8 = {
        onEdit: (__VLS_ctx.handleEdit)
    };
    var __VLS_2;
}
if (__VLS_ctx.selectedProtocol) {
    /** @type {[typeof ProtocolDetailModal, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(ProtocolDetailModal, new ProtocolDetailModal({
        ...{ 'onClose': {} },
        protocol: (__VLS_ctx.selectedProtocol),
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClose': {} },
        protocol: (__VLS_ctx.selectedProtocol),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.selectedProtocol))
                return;
            __VLS_ctx.selectedProtocol = null;
        }
    };
    var __VLS_11;
}
if (__VLS_ctx.isEditModalOpen) {
    /** @type {[typeof ProtocolModal, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(ProtocolModal, new ProtocolModal({
        ...{ 'onClose': {} },
        ...{ 'onProtocolUpdated': {} },
        isOpen: (__VLS_ctx.isEditModalOpen),
        initialProtocol: (__VLS_ctx.protocolToEdit),
    }));
    const __VLS_17 = __VLS_16({
        ...{ 'onClose': {} },
        ...{ 'onProtocolUpdated': {} },
        isOpen: (__VLS_ctx.isEditModalOpen),
        initialProtocol: (__VLS_ctx.protocolToEdit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_19;
    let __VLS_20;
    let __VLS_21;
    const __VLS_22 = {
        onClose: (__VLS_ctx.closeEditModal)
    };
    const __VLS_23 = {
        onProtocolUpdated: (__VLS_ctx.handleProtocolUpdated)
    };
    var __VLS_18;
}
/** @type {[typeof MotivationModal, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(MotivationModal, new MotivationModal({
    ...{ 'onClose': {} },
    isOpen: (__VLS_ctx.isMotivationModalOpen),
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClose': {} },
    isOpen: (__VLS_ctx.isMotivationModalOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
let __VLS_29;
const __VLS_30 = {
    onClose: (__VLS_ctx.closeMotivationModal)
};
var __VLS_26;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bg-gradient-to-r from-bordeaux-600 to-framboise-600 rounded-2xl p-8 text-white text-center shadow-xl" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "text-2xl font-bold mb-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-lg mb-6 text-white/90" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.openMotivationModal) },
    ...{ class: "btn btn-lg bg-white text-bordeaux-700 hover:bg-base-200 border-none shadow-lg" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://portf0l.io/maeva-rodrigues",
    target: "_blank",
    ...{ class: "btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-bordeaux-700" },
});
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral/70']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-horizontal']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-figure']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bordeaux-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral/60']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bordeaux-700']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-figure']} */ ;
/** @type {__VLS_StyleScopedClasses['text-framboise-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral/60']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['text-framboise-700']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-bordeaux-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-framboise-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/90']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:space-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bordeaux-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-base-200']} */ ;
/** @type {__VLS_StyleScopedClasses['border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-bordeaux-700']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $emit: emit,
            ProtocolCard: ProtocolCard,
            ProtocolDetailModal: ProtocolDetailModal,
            ProtocolModal: ProtocolModal,
            MotivationModal: MotivationModal,
            protocols: protocols,
            selectedProtocol: selectedProtocol,
            isEditModalOpen: isEditModalOpen,
            protocolToEdit: protocolToEdit,
            isMotivationModalOpen: isMotivationModalOpen,
            contributorCount: contributorCount,
            openMotivationModal: openMotivationModal,
            closeMotivationModal: closeMotivationModal,
            handleEdit: handleEdit,
            loadProtocols: loadProtocols,
            showProtocol: showProtocol,
            closeEditModal: closeEditModal,
            handleProtocolUpdated: handleProtocolUpdated,
            sortedProtocols: sortedProtocols,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $emit: emit,
            ...__VLS_exposed,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
