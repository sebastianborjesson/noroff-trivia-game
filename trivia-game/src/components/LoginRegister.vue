<script setup>
    import { ref } from "vue";
    import { useStore } from "vuex"

    const store = useStore()

    const username = ref("")

    const onRegisterLoginClick = async () => {
        const error = await  store.dispatch("loginRegister", {
            username
        })

        if (error !== null) {
            displayError.value = error;
        } else {
            emit("onAuthSuccess")
        }
    } 

</script>

<template>
    <h1 class="font-bold text-4xl">123 Fanta och rosé</h1>

    <div class="container flex items-center justify-between">
        <form class="mb-3">
            <fieldset class="mb-3">
                <label for="username" aria-label="Username" class="block">Username:</label>
                <input 
                    type="text"
                    id="username"
                    placeholder="Username"
                    class="border border-slate-300"
                />
            </fieldset>
        </form>

        <form>
            <fieldset class="mb-3">
                <h1> Guess populate from API?</h1>
                <p class="font-bold text-red-600">Only show Difficulty if username is valid</p>
                <input type="radio" id="any_difficulty" name="select_difficulty" value="random">
                <label for="any_difficulty">Random</label><br>

                <input type="radio" id="any_difficulty" name="select_difficulty" value="easy">
                <label for="any_difficulty">Easy</label><br>
                
                <input type="radio" id="any_difficulty" name="select_difficulty" value="medium">
                <label for="any_difficulty">Medium</label><br>
                
                <input type="radio" id="any_difficulty" name="select_difficulty" value="hard">
                <label for="any_difficulty">Hard</label>
            </fieldset>
        </form>

        <form>
            <fieldset class="mb-3">
                <label for="nrOfQuestions" aria-label="nrOfQuestions" class="block">Number of Questions?</label>
                <input 
                    type="number" 
                    id="nrOfQuestions"
                    placeholder="10"
                    class="border border-slate-300"
                />
            </fieldset>
        </form>
    </div>

</template>
