import { createStore } from "vuex";
import { apiFetchAllCategories } from "./api/index";
import { apiGetAllUsers, apiUserRegister } from "./api/users"

const initUser = () => {
    const storedUser = localStorage.getItem("trivia-user")
    if (!storedUser) {
        return null
    }
    return JSON.parse(storedUser)
}


export default createStore({
    state: {
        user: initUser(), // Well username...
        categories: [],                        
        question_diffuculty: "",
        numberOfQuestion: "",
    },
    getters: {
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        // setDifficulty?
        setCategories: (state, categories) => {
            state.categories = categories.trivia_categories
        },
        setLoggedUsers: (state, user) => {
            state.user = user
        },
    },
    actions: {
        async fetchAllCategories({ commit }) {
            const [ error, categories ] = await apiFetchAllCategories()
            if(error !== null) {
                return error;
            }
            commit("setCategories", categories)
            return null
        },
        async registerUser({ commit }, username) {
            try {
                const [ error, user ] =  await apiUserRegister(username);
                if (error !== null){
                    throw new Error(error)
                }
                commit("setUser", user)
                localStorage.setItem("trivia-user", JSON.stringify(user))
                return null
            } catch (error) {
                return error.message
            }
        },
        async GetAllUsers({ commit }) {
            const [ loggedUsers, error ] = await apiGetAllUsers()
            if (error !== null) {
                return error
            }
            commit("setLoggedUsers", loggedUsers)
            return null
        }
    }
})