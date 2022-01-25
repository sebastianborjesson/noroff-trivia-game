<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()


let currentQuestion = store.getters.currentQuestion;
    console.log(currentQuestion);
const questions = computed(() => store.getters.getQuestions)

const storedQuestions = ref([])
store.subscribe((mutation, state) => {
    storedQuestions.value = store.getters.getQuestions;
})

function answerQuestion () {
    currentQuestion += 1;
    console.log(storedQuestions);
    console.log(currentQuestion);

}
console.log(storedQuestions);


</script>
<template>
<div id="app" class="flex w-full h-screen justify-center items-center">
        <div v-if="!storedQuestions[currentQuestion]">
            <p>loading</p>

        </div>
        
        <div v-if="storedQuestions[currentQuestion]" :key="currentQuestion" class="w-full max-w-xl p-3">
            <h1 class="font-bold text-5xl text-center text-indigo-700">
                Question: {{ currentQuestion + 1 }}
            </h1>
            <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
                
                <p class="text-2xl font-bold">
                    {{storedQuestions[currentQuestion].question}}
                </p>
                <button v-for="(answers, index) in storedQuestions[currentQuestion].answers" 
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