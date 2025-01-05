import conf from "../conf/conf";
import { Client, Account,ID} from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            console.log(email,password,name)
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
            const userAccount= await this.account.create(ID.unique(),email,password,name)
            console.log("7777777777777777777777777777777777777777777777777777");
            console.log(userAccount)
            console.log("666666666666666666666666666666666666666666666666666666666666666666666");
            if(userAccount){
                return this.login({email,password})
            }else{
                return userAccount;
            }
        }catch(error){
            console.log("7777777777777777777777777777777777777777777777777777");
            console.log(error)
            console.log("666666666666666666666666666666666666666666666666666666666666666666666");
        }
    }

    async login({email,password}){
        console.log("cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc")
        console.log(email)
        console.log(password)
        console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }catch(error){
            console.log("create Email Password Error")
            console.log(error)
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console. log(error)
            return null
        }
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        }catch(error){
            console.log(error)
            return
        }
        
    }
}

 const authService=new AuthService()

 export default  authService;