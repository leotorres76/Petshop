import { User } from "../models/user.model"; //importo o modelo para tipar a variável abaixo

export class Security {
    public static set(user: User, token: string) { //seto duas variaveis uma do tipo User e outra do tipo string
        const data = JSON.stringify(user); //transformo o user recebido em string pois vem em formato JSON

        //seto os dados de user(data) e token no local storage 
        localStorage.setItem('petshopuser', btoa(data)); //btoa encripta os dados do user que estão em data
        localStorage.setItem('petshoptoken', token);
    }
    //método separado para setar o user
    public static setUser(user: User) {
        const data = JSON.stringify(user);
        localStorage.setItem('petshopuser', btoa(data));// btoa encripta dados do user
    }
    //método separado para setar o token
    public static setToken(token: string) {
        localStorage.setItem('petshoptoken', token);
    }
    //método para ler as informações do usuário
    public static getUser(): User {
        const data = localStorage.getItem('petshopuser');
        if (data) {
            return JSON.parse(atob(data)); //atob desencripta dados do user
        } else {
            return null;
        }
    }
    //método para ler as informações de token
    public static getToken(): string {
        const data = localStorage.getItem('petshoptoken');
        if (data) {
            return data;
        } else {
            return null;
        }
    }
    //método para verificar se user já possui token no BD/se está logado
    public static hasToken(): boolean {
        if (this.getToken())
            return true;
        else
            return false;
    }
    //remove dados de user e token do local storage no logout
    public static clear() {
        localStorage.removeItem('petshopuser');
        localStorage.removeItem('petshoptoken');
    }
}