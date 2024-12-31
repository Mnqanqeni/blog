import { use } from "react";
import conf from "../conf/conf";
import { Client, Databases,Storage,Query,ID} from "appwrite";
import { useId } from "react";


export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);
    }

    async getPost(slug){
        try{
            return await databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
        }catch(error){
            console.log(error)
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try{
            return await databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                    queries
            );
        }catch(error){
            console.log(error)
        }
    }

    async createPost({title,slug,content, featureImage,status,userId}){
        try{
            return databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,content,featureImage,status,userId}
            );
        }catch(error){

        }
    }

    async upDatePost(slug,{title,content,featureImage,status}){
        try{
            result = await databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug, 
                {title,content,featureImage,status},
            );
        }catch(error){

        }
    }

    async deletePost(slug){
        try{
            await databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true
        }catch(error){
            console.log(error)
        }
    }

    //storage

    async uploadFile(file){
        try{
            await storage.createFile(
                conf.appwriteBucketId, // bucketId
                ID.unique,
                file
            );
        }catch{

        }
    }

    async deleteFile(fileId){
        try{
            return await storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
        }catch{

        }
    }

    async getFilePreview(fileId){
        try{
            return await storage.getFilePreview(
                conf.bucket,
                fileId,
            ).href
        }catch(error){

        }
    }
}


const service = new Service();

export default service;