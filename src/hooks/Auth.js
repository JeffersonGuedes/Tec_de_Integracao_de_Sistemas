export function signOut() {
    window.location.href = "/";
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}
