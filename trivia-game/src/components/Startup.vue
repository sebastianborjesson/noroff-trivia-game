<script setup>
    import { computed, ref } from "vue";
    import { useStore } from "vuex"

    const store = useStore()

    const username = ref("")
    const categories = computed(() => store.state.categories)
    const selectedCategory = ref("any")


    const storedCategories = ref([])
    store.subscribe((mutation,state)=>{
        storedCategories.value = state.categories;
        console.log(storedCategories.value);
    })

    function selectedCategoryInList() {
        console.log(selectedCategory.value)
        // Want to use this value to set the category ID
    }


    function onStart() {

    }
    
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
                <select name="trivia_difficulty" class="form-control">
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </fieldset>
            
            <button type="submit" @click="onStart">STARTUURUUU</button>
        </form>
    </main>
</template>

<style scoped></style>