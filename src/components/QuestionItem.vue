<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter();
const currentQuestion = computed (() => store.getters.getCurrentQuestion)
const index = computed (() => currentQuestion.value.questionNumber)
const questionAmount = computed(() => store.state.questions)

let userAnswer = ref("");
let selectedAnswers = [];

function answerQuestion(answer) {
    if(index.value >= questionAmount.value.length - 1) {
        userAnswer = answer
        selectedAnswers.push(userAnswer)
        store.commit("setUserAnswers", selectedAnswers)
        router.push("/result");
    } else {
        store.commit("setCurrentQuestion", [index.value + 1])
        userAnswer = answer;
        selectedAnswers.push(userAnswer);
    }
}

</script>
<template>
    <div class="flex w-full h-screen justify-center items-center">
        
        <div class="w-full max-w-xl p-3">
            <h1 class="font-bold text-5xl text-center text-indigo-700">Question: {{ index + 1 }}</h1>
            <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8" >
                <p class="text-2xl font-bold" v-html="currentQuestion.question"></p>
                <div v-for="(answer, index) in currentQuestion.answers" :key="index">
                    <button v-html="answer" :value="answer"
                    type="button"
                    class="block mt-4 border w-full text-left border-gray-300 rounded-lg py-2 px-6 text-lg"
                    @click="answerQuestion(answer)"></button>
                </div>
            </div>
        </div>
</div>
</template>
<style>
</style>