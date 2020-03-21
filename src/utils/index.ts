export const setCookie = (token: string) => {
    document.cookie = `token=${token}`;
}

export const getCookie = () => {
    return document.cookie
}

export const removeCookie = () => {
    document.cookie = `token=`;
}