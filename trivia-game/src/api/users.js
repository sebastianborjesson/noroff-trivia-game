const apiURL = "https://druwan-noroff-api.herokuapp.com"
const apiKey = "wvFWtgXenkKtZhzYRH7Vmg=="


export async function apiGetAllUsers() {
    try {
        const response = await fetch(`${apiURL}`)

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


// Post to Noroff API
export async function apiUserRegister(username) {
    try {
        const response = await fetch(`${apiURL}/trivia`, {
            method: "POST",
            headers: {
                "X-API-Key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.username.value,
                highScore: 0
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Could not create new user")
            }
            console.log(response.json())
            return response.json()
        })
        .then(newUser => {
            console.log(newUser)
        })
    } catch (error) {
        return error.message
    }
}


// Updating an user
// const userID = 1 // Update user with id 1

export async function apiUpdateUserScore(userId, newhighScore) {
    try {
        const response = await fetch(`${apiURL}/trivia/${userId}`, {
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