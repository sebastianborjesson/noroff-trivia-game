import { createStore } from "vuex";
import { apiFetchAllCategories } from "./api";

const initUser = () => {
    const storedUser = localStorage.getItem("trivia-user")
    if (!storedUser) {
        return null
    }
    return JSON.parse(storedUser)
}


export default createStore({
    state: {
        // user: initUser(), // Well username...
        categories: [],
        username: ""
    },
    getters: {
    },
    mutations: {
        // setUser: (state, user) => {
        //     state.user = user
        // },
        // setDifficulty?
        setCategories: (state, categories) => {
            state.categories = categories.trivia_categories
        },
    },
    actions: {
        async fetchAllCategories({ commit }) {

            const [ error, categories ] = await apiFetchAllCategories()
            if(error !== null) {
                return error;
            }
            commit("setCategories", categories) // Categories is an array
            return null // error
        }
    }
})

