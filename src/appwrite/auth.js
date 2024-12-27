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
            await this.account.create(ID.unique(),email,password,name)
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
            return await this.account.createEmailS
        }catch{
            throw error;
        }
    }

    async logout(){

    }
}

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(conf.appwrtiteProjectId);

const account = new Account(client);