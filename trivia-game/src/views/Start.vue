<script setup>
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import Startup from '../components/Startup.vue';

    const store = useStore()
    onMounted(async () => {
        await store.dispatch("getAllUsers")
        await store.dispatch("fetchAllCategories")
    });
    const router = useRouter()
    const handleStartupSuccess = () => {
        router.push("/questions")
    }
    
</script>

<template>
    <Startup @startupSuccessful="handleStartupSuccess" />
</template>