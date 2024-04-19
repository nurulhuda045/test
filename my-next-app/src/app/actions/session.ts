'use-client'

export async function setToken(token: string) {

    localStorage.setItem('token', token)
}

export async function deleteToken() {
    localStorage.removeItem('token')
}