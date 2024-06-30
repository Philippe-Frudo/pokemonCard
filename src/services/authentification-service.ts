export default class AuthentificationService {

    static isAuthenticated = true;

    /**
     * 
     * @param {String} userName
     * @param {String} passowrd
     * @returns 
     */
    static login(userName: String, passowrd: String) {
        const isAuthenticated = (userName === "pikachu" && passowrd === "pikachu");

        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = isAuthenticated;
                resolve(isAuthenticated);
            }, 1000);
        });
    }

}
