import conf from "../conf/conf";
import { Client, Account } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwrtiteUrl).setProject(conf.appwrtiteProjectId)
        this.account=new Account(this.client);
    }

    async createAccount(email,password,name){
        try{
            return await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password})
            }else{
                return userAccount;
            }
        }catch(error){

        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }catch{
            throw error;
        }
    }
    async getCurrenUser(){
        try{
            return await this.account.get();
        }catch(error){
            console. log(error)
            return null
        }
    }

    async logout(){
        try{
            return await account.deleteSessions();
        }catch(error){
            console.log(error)
            return
        }
        
    }
}

 const authService=new AuthService()

 export default  authService;