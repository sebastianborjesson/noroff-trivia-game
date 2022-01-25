<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
defineProps({
    question: {
        type: Object,
        required: true
    }
})

const currentQuestion = computed(() => store.getters.currentQuestion)

</script>
<template>
<div id="app" class="flex w-full h-screen justify-center items-center">
        <div class="w-full max-w-xl p-3">
            <h1 class="font-bold text-5xl text-center text-indigo-700">
                Question: {{ currentQuestion + 1 }}
            </h1>
            <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
                
                <p class="text-2xl font-bold" :question="question">
                    {{question}}
                </p>
                <button v-for="(answers, index) in question" 
                :key="answers" 
                :value="index" 
                type="button" 
                class="block mt-4 border w-full text-left 
                border-gray-300 rounded-lg py-2 px-6 text-lg"
                @click="answerQuestion">
                {{answers}}
                </button>
            </div>
        </div>
    </div>
</template>
<style>

</style>