<script setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()
    const user = store.state.user
    const tempuser = store.state.setSingleUser
    // We need to get the user, users answers and the actual correct answer to the questions
    // const questions = computed(() => store.getters.questions)
    const allUserQuestions = store.getters.getQuestions;
    const allUserAnswers = store.getters.getUserAnswer;

    
    let score = 0;  

    // Compare users answer with the correct answer
    for (let index = 0; index < allUserAnswers.length; index++) {
        if (allUserAnswers[index] === allUserQuestions[index].correct_answer){
            // if true add +10 points!
            console.log("Correct, +10 points added!")
            score += 10;
        } else {
            console.log("Wrong answer!")
        }
    }
    store.commit("setHighScore", score);

    // after do api call to check the users highScore! If > existing, update!
    if (score > 0) {
        const currentUser = store.getters.getUser
        // console.log(store.getters.getUser.highScore)
        if (store.getters.getHighScore > currentUser.highScore) {
            // Updatera API user highscore
            // skriv över getUser highscore med currentUser highscore
            console.log()
            currentUser.highScore = score
            console.log(currentUser.highScore)

            const id = currentUser.id;
            const highScore = currentUser.highScore
            await store.dispatch("updateUserScore", { id, highScore })
        }
    }
</script>

<template>
    <main >
        <div class="grid grid-cols-2">
            <div> 
                <h1>Your Answers</h1>
            </div>
            <div>
                <h1>Correct Answers</h1>
                <ul>

                </ul>
            </div>
        </div>
    </main>
</template>