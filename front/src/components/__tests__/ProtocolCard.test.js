import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProtocolCard from '@/components/ProtocolCard.vue';
describe('ProtocolCard', () => {
    it('correspond au snapshot', () => {
        const wrapper = mount(ProtocolCard, {
            props: {
                protocol: {
                    id: 1,
                    title: 'Protocole 1 : Nettoyage matériel',
                    description: 'Test',
                    category: 'Stérilisation',
                    icon: '🧫',
                    author: 'Maëva Rodrigues',
                    createdAt: '2023-10-01T00:00:00Z',
                    updatedAt: '2023-10-02T00:00:00Z',
                },
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
