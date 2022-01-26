<script setup>
    import { ref } from "vue";
    import { useStore } from "vuex"


    const store = useStore();
    const displayError = ref("")

    const username = ref("")
    const selectedCategory = ref("")
    const trivia_difficulty = ref("")
    const trivia_amount = ref("")

    const storedCategories = ref([])
    store.subscribe((mutation, state) => {
        storedCategories.value = state.categories;
    })

    function selectedCategoryInList() {
        return selectedCategory.value
    }

    const emit = defineEmits(["startupSuccessful"]);


    const onRegisterSubmit = async (user) => {
        await store.dispatch("getAllUsers", user)
        const userAlreadyInAPI = store.state.loggedUsers.some(user => user.username === username.value)
        if(!userAlreadyInAPI) {
            await store.dispatch("registerUser", { username })
        } else {
            await store.dispatch("getSingleUser", username.value);
        }
        const category = selectedCategory.value;
        const numberOfQuestion = trivia_amount.value;
        const question_diffuculty = trivia_difficulty.value;

        const error = await store.dispatch("fetchQuestions", {numberOfQuestion, category, question_diffuculty})
        if (error !== null) {
            displayError.value = error;
        } else {
            emit("startupSuccessful")
        }
        
        
    }
   
    // Will get posted on API 
    // const onRegisterSubmit = async () => {
    //     const usernameExistCheck = await store.dispatch("getSingleUser", { username })
    //     if (usernameExistCheck !== null) {
    //         displayError.value = usernameExistCheck
    //     } else {
    //         const userAlreadyInAPI = store.state.loggedUsers.some(user => user.username === username.value)
    //         if (userAlreadyInAPI) {
    //             displayError.value = `Username: ${username.value} already exists.`
    //         } else {
    //             const error = await store.dispatch("registerUser", { username })
    //             if (error !== null) {
    //                 displayError.value = error
    //             } else {
    //                 const category = selectedCategory.value;
    //                 const numberOfQuestion = trivia_amount.value;
    //                 const question_diffuculty = trivia_difficulty.value;

    //                 const error = await store.dispatch("fetchQuestions", {numberOfQuestion, category, question_diffuculty})
    //                 if (error !== null) {
    //                     displayError.value = error;
    //                 } else {
    //                     emit("startupSuccessful")
    //                 }
    //             }
    //         }
    //     } 
    // }
</script>

<template>
    <div id="app" class="border solid bg-slate-300 w-full h-screen">
        <!-- Header -->
        <div id="header">
            <header class="">
                <h1 class="font-bold text-4xl flex justify-center pt-5">Triva Quiz</h1>
            </header>
        </div>
        <!-- userform and nrQuestions form -->
        <div class="flex justify-center">
            <form  class="ml-3 grid gap-1 grid-cols-2">
                <fieldset class="mb-3">
                    <label for="username" aria-label="Username" class="block">Username</label>
                    <input type="text" id="trivia_username" v-model="username" class="border border-slate-300"/>
                </fieldset>
                
                <fieldset class="mb-3">
                    <label for="trivia_amount" aria-label="Amount of questions" class="block">Number of Questions:</label>
                    <input type="number" name="trivia_amount" id="trivia_amount" placeholder="10" v-model="trivia_amount" class="border border-slate-300">
                </fieldset>
            </form>
        </div>

        <div class="flex justify-center">
            <form @submit.prevent="onSubmit" class="grid grid-cols-3">
                <fieldset class="mb-3 object-fill">
                    <label for="difficulty" aria-label="Difficulty" class="block">Select Difficulty: </label>
                    <select name="trivia_difficulty" class="border border-slate-300 w-full" v-model="trivia_difficulty">
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </fieldset>
                
                <fieldset class="mb-3">
                    <label for="categories" aria-label="category" class="block">Select Category: </label>
                    <select name="categories" v-model="selectedCategory" @change="selectedCategoryInList" class="border border-slate-300">
                        <option v-for="category in storedCategories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </fieldset>
                <button type="submit" @click="onRegisterSubmit(user)" class="bg-indigo-500 text-white m-3 mt-1 rounded text-xl">Start Game</button>
            </form>

        </div>
        <div class="flex justify-center items-center">     
            <div v-if="displayError" class="bg-red-500 text-white p-3 rounded">
                <span class="text-lg block mb-3">Error:</span>
                <p>{{ displayError }}</p>
            </div>
        </div>
    </div>
</template>
