import { createStore } from "vuex";
import { apiFetchAllCategories } from "./api/index";
import { apiGetAllUsers, apiGetSingleUser, apiUserRegister } from "./api/users"
import { apiFetchQuestions } from "./api/questions";

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
        loggedUsers: [],
        setSingleUser: "",                 
        question_diffuculty: "",
        numberOfQuestion: "",
        questions: [],
        currentQuestion: 0,
    },
    getters: {
        currentQuestion: state => {
            return state.currentQuestion;
        },
        getQuestions: (state) => {
            return state.questions;
        }
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        // setDifficulty?
        setCategories: (state, categories) => {
            state.categories = categories.trivia_categories
        },
        setLoggedUsers: (state, loggedUsers) => {
            state.loggedUsers = loggedUsers
        },
        setSingleUser: (state, setSingleUser) => {
            state.setSingleUser = setSingleUser
        },
        setQuestions: (state, results) => {
            state.questions = results.map((question, index) => {
            question.id = index + 1;
            // create a property and combine the correct and false answers to the object
            question.answers = [ question.correct_answer, ...question.incorrect_answers ];
                /* Shuffle question.answers array */
                for (let i = question.answers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [question.answers[i], question.answers[j]] = [
                        question.answers[j],
                        question.answers[i],
                    ];
                }
                return question;
            })
        },
        incrementRound: (state) => {
            state.currentQuestion += 1;
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
        // async loginUser({}) {

        // },
        async registerUser({ commit }, username) {
            try {
                // const currentUser = localStorage.getItem("trivia-user")
                // if (currentUser === null) {
                const [ error, user ] =  await apiUserRegister(username);
                if (error !== null){
                    throw new Error(error)
                }
                commit("setUser", user)
                localStorage.setItem("trivia-user", JSON.stringify(user.username))
                return null
                // }
                // console.log(username.username.value)
                
            } catch (error) {
                return error.message
            }
        },
        async getAllUsers({ commit }) {
            const [ error, loggedUsers ] = await apiGetAllUsers()
            if (error !== null) {
                return error
            }
            for (const obj of loggedUsers) {
                console.log(obj.username, obj.id)
            }
            commit("setLoggedUsers", loggedUsers)
            return null
        },
        async getSingleUser({ commit }, username) {
            const [ error, user ] = await apiGetSingleUser(username)
            if (error !== null) {
                return error
            }
            commit("setSingleUser", user)
            return null
        },
        async fetchQuestions({commit}) {
            const [ error, results ] = await apiFetchQuestions();
            
            if(error !== null) {
                return error;
            }
            
            commit("setQuestions", results);
            return null;
        },
    }
})