import { createStore } from "vuex";
import { apiFetchQuestions } from "./api/questions";


export default createStore({
    state: {
        questions: [],
        currentQuestion: 0,
    },
    mutations: {
        setQuestions: (state, results) => {
            
            state.questions = results.map((question) => {
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
            
            console.log(state.questions);
        },
        incrementRound: (state) => {
            state.currentQuestion += 1;
          },
    },
    getters: {
        currentQuestion: state => {
            return state.currentQuestion;
        },
    },
    actions: {
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