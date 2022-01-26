import { BASE_URL } from ".";


// example 
// https://opentdb.com/api.php?amount=10&category=23&difficulty=medium

export async function apiFetchQuestions(numberOfQuestion, category,  question_diffuculty) {
    try {
        const response = await fetch(`${BASE_URL}amount=${numberOfQuestion}&category=${category}&difficulty=${question_diffuculty}`)
        // const response = await fetch(`${BASE_URL}amount=10&category=23&difficulty=medium`)

        if(!response.ok) {
            throw new Error("Could not find questions")
        }

        const { response_code, results, error = "Could not fetch questions" } = await response.json()
        
        if(response_code !== 0) {
            throw new Error(error)
        }
        
        return [ null, results ]

    } catch (error) {
        return [ error.message, [] ]        
    }
}