<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex"

    const router = useRouter()

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
        // console.log(selectedCategory.value)
        // want to use this value to set category id
        return selectedCategory.value
    }

    function onStart() {
        console.log("Username: ", username.value, "Amount: ", trivia_amount.value, "Category: ", selectedCategory.value, "Difficulty: ", trivia_difficulty.value)
        // Move to next
    }

   
    // Will get posted on API 
    const onRegisterSubmit = async () => {
        const usernameExistCheck = await store.dispatch("getSingleUser", { username })
        if (usernameExistCheck !== null) {
            displayError.value = usernameExistCheck
        } else {
            const userAlreadyInAPI = store.state.loggedUsers.some(user => user.username === username.value)
            if (userAlreadyInAPI) {
                displayError.value = `Username: ${username.value} already exists.`
            } else {
                const error = await store.dispatch("registerUser", { username })
                if (error !== null) {
                    displayError.value = error
                } else {
                    // Register OK 
                    // Create a link
                    // router.push("/...")
                }
            }
        } 
    }
</script>

<template>
    <header>
        <h1 class="font-bold text-4xl flex justify-center pt-5">Triva Quiz</h1>
    </header>
    
    <div class="container flex justify-evenly">
        <form class="ml-3">
            <fieldset class="mb-3">
                <label for="username" aria-label="Username" class="block">Username</label>
                <input type="text" id="trivia_username" v-model="username" class="border border-slate-300"/>
            </fieldset>
        </form>
    </div>

    <div v-if="displayError" class="bg-red-500 text-white p-3 rounded">
        <span class="text-lg block mb-3">Error:</span>
        <p>{{ displayError }}</p>
    </div>

    <div class="container flex justify-evenly">
        <form @submit.prevent="onSubmit" class="flex items-center justify-between">
            
            <fieldset>
                <label for="trivia_amount">Number of Questions:</label>
                <input type="number" name="trivia_amount" id="trivia_amount" v-model="trivia_amount" class="border border-slate-300">
            </fieldset>
            
            <fieldset>
                <label for="categories">Select Category: </label>
                <select name="categories" v-model="selectedCategory" @change="selectedCategoryInList" class="border border-slate-300">
                    <option v-for="category in storedCategories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </fieldset>
            
            <fieldset>
                <label for="difficulty">Select Difficulty: </label>
                <select name="trivia_difficulty" class="border border-slate-300" v-model="trivia_difficulty">
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </fieldset>
        </form>
        <div>
            <!-- onRegisterSubmit -->
            <button type="submit" @click="onStart" class="bg-indigo-500 text-white p-3 rounded">Start Game</button>
        </div>
    </div>      
</template>
