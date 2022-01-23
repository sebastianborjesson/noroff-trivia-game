import { createStore } from "vuex";

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
        diffuculty: null,
        numberOfQuestion: null,
        categories: null,                        
    },
    getters: {
        // filterQuestionsByCategoryID:
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        // setDifficulty?
        // setCategory?
    },
    actions: {

    }
})