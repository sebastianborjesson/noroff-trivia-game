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
        const response = await fetch(`${apiURL}/trivia?username=${username.username.value}`)
        if (!response.ok) {
            throw new Error("Could not find user!") // => OK för att registrera
        }
        const data = await response.json()

        if (data.length > 1) {
            // console.log("Length > 1 ", data[0])
            return [ null, data[0] ]
        } else {
            return [ null, data ]
        }
        // console.log("Length < 1", data)
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