<script setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()

    // We need to get the user, users answers and the actual correct answer to the questions
    // const questions = computed(() => store.getters.questions)
    const allUserQuestions = store.getters.getQuestions;
    const allUserAnswers = store.getters.getUserAnswer;
    const currentUser = store.getters.getUser

    
    let score = 0;  

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
    <main >
        <div class="grid grid-cols-2">
            <div> 
                <h1>Your Answers</h1>
                <ul id="userAnswers">
                    <li v-for="answer in allUserAnswers" :key="answer.id">
                        {{ answer }}
                    </li>
                </ul>
            </div>
            <div>
                <h1>Correct Answers</h1>
                <ul id="correctAnswers">
                    <li v-for="question in allUserQuestions" :key="question.id">
                        {{ question.correct_answer }}
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>