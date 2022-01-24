const api_URL = "https://druwan-noroff-api.heroku.com";
const apiKey = "wvFWtgXenkKtZhzYRH7Vmg=="


export async function apiGetAllUsers() {
    try {
        const response = await fetch(`${api_URL}/trivia`)

        if(!response.ok) {
            throw new Error("Could not find users 🤔")
        }
        const { success, data, error = "Could not fetch users 🤔"} = await response.json()

        if(!success) {
            throw new Error(error)
        }
        return [ loggedUsers, null ]
    } catch (error) {
        return [ [], error.message]
    }
}










// Exporting to Noroff API
export async function apiUserRegister(username) {
    try {
        const response = await fetch(`${api_URL}/trivia`, {
            method: "POST",
            headers: {
                "X-API-Key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                highScore: 0
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Could not create new user")
            }
            return response.json()
        })
        .then(newUser => {
            //newUser is the new user with an id
            // newUser = {
            //     id,
            //     username,
            //     highScore
            // }
        })
    } catch (error) {
        return error.message
    }
}


// Updating an user
// const userID = 1 // Update user with id 1

export async function apiUpdateUserScore(userId, newhighScore) {
    try {
        const response = await fetch(`${api_URL}/trivia`, {
            method: "PATCH",
            headers: {
                "X-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Provide new highScore
                highScore: newhighScore
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Could not update high score")
            }
            return response.json()
        })
        .then(updateUser => {
            //updatedUser is the user with the Patched data
        })
    } catch (error) {
        return error.message
    }
}