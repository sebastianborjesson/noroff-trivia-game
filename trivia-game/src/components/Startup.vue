<script setup>
    import { computed, ref } from "vue";
    import { useStore } from "vuex"

    const store = useStore()

    const username = ref("")
    // const categories = computed(() => store.state.categories)
    const selectedCategory = ref("")
    const trivia_difficulty = ref("")
    const trivia_amount = ref("")


    const storedCategories = ref([])
    store.subscribe((mutation,state)=>{
        storedCategories.value = state.categories;
    })

    function selectedCategoryInList() {
        // console.log(selectedCategory.value)
        // Want to use this value to set the category ID
        return selectedCategory.value
    }


    function onStart() {
        console.log(username.value, trivia_amount.value, selectedCategory.value, trivia_difficulty.value)
        // user = {
        //     username: 
        // }
    }
    
</script>

<template>
    <header class="mb-2">
        <h1 class="font-bold text-4xl flex justify-center pt-5">Trivia Quiz</h1>
    </header>

    <div class="container flex justify-evenly">
        <form class="ml-3">
            <fieldset class="mb-3">
                <label for="username" aria-label="Username" class="block">Username</label>
                <input type="text" id="trivia_username" v-model="username" class="border border-slate-300"/>
            </fieldset>
        </form>
        <!-- Check if Username is available -->
        <button type="submit" class="bg-indigo-500 text-white p-3 rounded">Register</button>
    </div>

    <div class="container">
        <form @submit.prevent="onSubmit" class="">        

            <fieldset>
                <label for="trivia_amount">Number of Questions:</label>
                <input type="number" name="trivia_amount" id="trivia_amount" v-model="trivia_amount">
            </fieldset>
            
            <fieldset>
                <label for="categories">Select Category: </label>
                <select name="categories" v-model="selectedCategory" @change="selectedCategoryInList">
                    <option v-for="category in storedCategories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </fieldset>

            <fieldset>
                <label for="difficulty">Select Difficulty: </label>
                <select name="trivia_difficulty" class="form-control" v-model="trivia_difficulty">
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </fieldset>
        </form>
    </div>
        
    <div>
        <button type="submit" @click="onStart" class="bg-indigo-500 text-white p-3 rounded">STARTUURUUU</button>
    </div>
</template>

<style scoped></style>