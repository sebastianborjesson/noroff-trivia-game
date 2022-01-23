<script setup>
    import { onMounted, defineProps, ref } from "vue";
    import { useStore } from "vuex"

    // const getCategories = async function () {
    //     await fetch("https://opentdb.com/api_category.php")
    //         .then(async (response) => {
    //             const results = await response.json();
    //         })
    // }

    const username = ref("")
    
</script>

<template>
    <main>
        <h1 class="font-bold text-4xl">123 Fanta och rosé</h1>

        <form @submit.prevent="onSubmit" class="flex items-center justify-between">
            <fieldset>
                <label for="username" aria-label="Username" class="block">Username</label>
                <input type="text" id="username" v-model="username" />
            </fieldset>

            <fieldset>
                <label for="trivia_amount">Number of Questions:</label>
                <input type="number" name="trivia_amount" id="trivia_amount">
            </fieldset>
            
            <!-- <fieldset>
                <label for="trivia_category">Select Category: </label>
                <select name="trivia_category" v-model="trivia_category">
                    <option v-for="trivia_category in result" :key="trivia_category.id" :value="trivia_category.name">
                        {{ trivia_category.name }}
                    </option>
                </select>
            </fieldset> -->
            
            <fieldset>
                <label for="difficulty">Select Difficulty: </label>
                <select name="trivia_difficulty" class="form-control">
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </fieldset>
            
            <button type="submit">STARTUUUUU</button>
        </form>
    </main>
</template>
