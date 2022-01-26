<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import QuestionItem from '../components/QuestionItem.vue';

const store = useStore();


</script>

<template>
    <main class="container mx-auto px-4 bg-slate-300">
        <QuestionItem />
    </main>
</template>