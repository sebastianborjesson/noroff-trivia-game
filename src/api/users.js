const apiURL = "https://druwan-noroff-api.herokuapp.com"
const apiKey = "wvFWtgXenkKtZhzYRH7Vmg=="


export async function apiGetAllUsers() {
    try {
        const response = await fetch(`${apiURL}/trivia`)

        if(!response.ok) {
            throw new Error("Could not find users 🤔")
        }
        const data = await response.json()

        return [ null, data ]
    } catch (e) {
        return [ e.message, [] ]
    }
}

export async function apiGetSingleUser(username){
    try {
        const response = await fetch(`${apiURL}/trivia?username=${username}`)
        if (!response.ok) {
            throw new Error("Could not find user!") // => OK för att registrera
        }
        const data = await response.json()
        console.log(data);
        return [ null, data ]
    } catch (e) {
        return [ e.message, [] ]
    }
}

// Post to Noroff API
export async function apiUserRegister(username) {
    try {
        const config = {
            method: "POST",
            headers: {
                "X-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.username.value,
                highScore: 0
            })
        }
        const response = await fetch(`${apiURL}/trivia`, config)
        const data = await response.json()
        return [ null, data ]
    } catch (error) {
        console.log(error)
    }
}


// Updating an user
// const userID = 1 // Update user with id 1

export async function apiUpdateUserScore(userId, newHighScore) {
    try {

        const config = {
            method: "PATCH",
            headers: {
                "X-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Provide new highScore
                highScore: newHighScore
            })
        }

        const response = await fetch(`${apiURL}/trivia/${userId}`, config)        
        if(!response.ok) {
            throw new Error("Could not update high score")
        }
        const data = await response.json()
        return [null, data]
    } catch (error) {
        return error.message
    }
}