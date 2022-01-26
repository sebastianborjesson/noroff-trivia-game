<script setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()
    
    // We need to get the user, users answers and the actual correct answer to the questions
    // const questions = computed(() => store.getters.questions)
    const allUserQuestions = store.state.questions;
    const index = allUserQuestions.length
    
    for (let index = 0; index < allUserQuestions.length; index++) {
        console.log(allUserQuestions[index])        
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