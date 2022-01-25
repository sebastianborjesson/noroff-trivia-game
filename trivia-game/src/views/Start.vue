<script setup>
    import { onMounted } from 'vue';
    import { useStore } from 'vuex';
    import Startup from '../components/Startup.vue';

    const store = useStore()
    onMounted(async () => {
        await store.dispatch("getAllUsers")
        await store.dispatch("fetchAllCategories")
    });
    
</script>

<template>
    <Startup />
</template>