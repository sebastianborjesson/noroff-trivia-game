<script setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()

    // We need to get the user, users answers and the actual correct answer to the questions
    // const questions = computed(() => store.getters.questions)
    const allUserQuestions = store.getters.getQuestions;
    const allUserAnswers = store.getters.getUserAnswer;
    const currentUser = store.getters.getUser

    const emit = defineEmits(["onRestartBtn"])

    
    let score = 0;

    const onReplaySubmit = async() => {
        emit("onRestartBtn")
    }

function getScore () {

    // Compare users answer with the correct answer
    for (let index = 0; index < allUserAnswers.length; index++) {
        if (allUserAnswers[index] === allUserQuestions[index].correct_answer){
            // if true add +10 points!
            // console.log("Correct, +10 points added!")
            score += 10;
        } else {
            // console.log("Wrong answer!")
        }
    }
    // console.log(score);
    updateScore(score);

}
const updateScore = async (score) => {
    // console.log(score)
    // console.log(currentUser.highScore);

    // after do api call to check the users highScore! If > existing, update!
    if (score >= 0 && currentUser.highScore < score) {
        store.commit("setHighScore", score);
        // Updatera API user highscore
        // skriv över getUser highscore med currentUser highscore
        currentUser.highScore = score
        const highScore = currentUser.highScore
        await store.dispatch("updateUserScore", highScore)
        
    }
}
getScore();
</script>

<template>
    <main class="bg-slate-300">
        <div id="header">
            <header>
                <h1 class="font-bold text-3xl flex justify-center pt-5">
                    Good job {{ currentUser.username }}, you scored: {{ score }} points!
                </h1>
            </header>
        </div>

        <div class="">
            <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-start-1 row-end-4">
                    <h1 class="font-bold text-xl flex justify-start p-5" >Question</h1>
                    <ol type="1" id="actualQuestion">
                        <li v-for="question in allUserQuestions" :key="question.id" v-html="question.question" :value="question.question" class="flex m-5">
                        </li>
                    </ol>
                </div>
                <div class="row-start-1 row-end-4">
                    <h1 class="font-bold text-xl flex justify-start p-5">Your Answers</h1>
                    <ol id="userAnswers" >
                        <li v-for="answer in allUserAnswers" :key="answer.id" v-html="answer" :value="answer" class="flex m-5">
                        </li>   
                    </ol>
                </div>
                <div class="row-start-1 row-end-4">
                    <h1 class="font-bold text-xl flex justify-start p-5" >Correct Answers</h1>
                    <ol id="correctAnswers">
                        <li v-for="question in allUserQuestions" :key="question.id"  v-html="question.correct_answer" :value="question.correct_answer" class="flex m-5">
                        </li>
                    </ol>
                </div>
            </div>       
        </div>
        <div class="flex justify-center mb-5">
            <button type="submit" @click="onReplaySubmit" class="bg-indigo-500 text-white rounded text-2xl mt-5 w-1/4">Replay</button>           
        </div>
    </main>
</template>