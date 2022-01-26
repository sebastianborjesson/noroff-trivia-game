<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import QuestionItem from '../components/QuestionItem.vue';

const store = useStore();
onMounted(async() => {
    await store.dispatch("fetchQuestions");
})


</script>

<template>
    <main class="container mx-auto px-4">
        <QuestionItem />
    </main>
</template>