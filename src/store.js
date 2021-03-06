import { createStore } from "vuex";

import { apiFetchAllCategories } from "./api/index";
import { apiGetAllUsers, apiGetSingleUser, apiUpdateUserScore, apiUserRegister } from "./api/users"
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
        user: initUser(),
        categories: [],
        loggedUsers: [],
        setSingleUser: {},                 
        question_diffuculty: "",
        numberOfQuestion: 0,
        questions: [],
        currentQuestion: {
            question: "",
            questionNumber: 0,
            answers: []
        },
        userAnswers: [],
        highScore: 0
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
        currentQuestionNumber: state => {
            return state.currentQuestionNumber;
        },
        getQuestions: (state) => {
            return state.questions;
        },
        getCurrentQuestion: (state) => {
            return state.currentQuestion
        },
        getUserAnswer: (state) => {
            return state.userAnswers
        },
        getUserHighScore: (state) => {
            return state.highScore
        }
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setCategories: (state, categories) => {
            state.categories = categories.trivia_categories
        },
        setLoggedUsers: (state, loggedUsers) => {
            state.loggedUsers = loggedUsers
        },
        setSingleUser: (state, user) => {
            state.user = user
        },
        setQuestions: (state, results) => {
            state.questions = results
        },
        setCurrentQuestion: (state, questionNumber) => {
            state.currentQuestion.question = state.questions[questionNumber[0]].question;
            state.currentQuestion.questionNumber = questionNumber[0];

            // Combine answers to one array and randomize where they populate
            let answers = [];
            answers = [ state.questions[questionNumber[0]].correct_answer, ...state.questions[questionNumber[0]].incorrect_answers ];
            if (answers.length > 2) {

                for (let i = answers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [ answers[i], answers[j] ] = [ answers[j], answers[i] ];
                }
            }
            state.currentQuestion.answers = answers;
        },
        setUserAnswers: (state, answer) => {
            state.userAnswers = answer
        },
        setHighScore: (state, score) => {
            state.user.highScore = score 
        }
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
                localStorage.setItem("trivia-user", JSON.stringify(user.username))
                return null                
            } catch (error) {
                return error.message
            }
        },
        async getAllUsers({ commit }) {
            const [ error, loggedUsers ] = await apiGetAllUsers()
            if (error !== null) {
                return error
            }
            commit("setLoggedUsers", loggedUsers)
            return null
        },
        async getSingleUser({ commit }, username) {
            const [ error, user ] = await apiGetSingleUser(username)
            if (error !== null) {
                return error
            }
            commit("setSingleUser", user[0])
            return null
        },
        async fetchQuestions({commit}, {numberOfQuestion, category, question_diffuculty}) {
            const [ error, results ] = await apiFetchQuestions(numberOfQuestion, category, question_diffuculty);
            if(error !== null) {
                return error;
            }
            
            commit("setQuestions", results);
            commit("setCurrentQuestion", [0])
            return null;
        },
        async updateUserScore({ commit, state }, highScore) {
            console.log(state.user.id);
            const [ error, result ] = await apiUpdateUserScore(state.user.id, highScore)
            if (error !== null) {
                return error
            }
            commit("setHighScore", highScore)
            return null
        }
    }
})

