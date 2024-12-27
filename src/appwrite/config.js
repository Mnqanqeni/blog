import { use } from "react";
import conf from "../conf/conf";
import { Client, Databases,Storage,Query,ID} from "appwrite";
import { useId } from "react";


export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwrtiteUrl).setProject(conf.appwrtiteProjectId);
        this.databases=new Databases(ths.client);
        this.storage=new Storage(this.client);
    }

    async getPost(slug){
        try{
            return await databases.getDocument(
                conf.appwrtiteDatabaseId,
                conf.appwrtiteCollectionId,
                slug,
            );
        }catch(error){
            console.log(error)
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try{
            return await databases.listDocuments(
                conf.appwrtiteDatabaseId,
                conf.appwrtiteCollectionId,
                    queries
            );
        }catch(error){
            console.log(error)
        }
    }

    async createPost({title,slug,content, featureImage,status,userId}){
        try{
            return databases.createDocument(
                conf.appwrtiteDatabaseId,
                conf.appwrtiteCollectionId,
                slug,
                {title,content,featureImage,status,userId}
            );
        }catch(error){

        }
    }

    async upDatePost(slug,{title,content,featureImage,status}){
        try{
            result = await databases.updateDocument(
                conf.appwrtiteDatabaseId, 
                conf.appwrtiteCollectionId, 
                slug, 
                {title,content,featureImage,status},
            );
        }catch(error){

        }
    }

    async deletePost(slug){
        try{
            await databases.deleteDocument(
                conf.appwrtiteDatabaseId,
                conf.appwrtiteCollectionId,
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
                conf.appwrtiteBucketId, // bucketId
                ID.unique,
                file
            );
        }catch{

        }
    }

    async deleteFile(fileId){
        try{
            return await storage.deleteFile(
                conf.appwrtiteBucketId,
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