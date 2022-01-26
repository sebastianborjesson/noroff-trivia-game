<script setup>
    import { useStore } from 'vuex';
    import ShowResults from '../components/ShowResults.vue';
    import { useRouter } from 'vue-router';

    const store = useStore()
    const router = useRouter()
    const handleRestartSuccess = () => {
        router.push("/")
    }

    
</script>

<template>
    <ShowResults @onRestartBtn="handleRestartSuccess"/>
</template>