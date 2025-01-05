import { use } from "react";
import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";
import { useId } from "react";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching posts:", error.message, error.code);
      console.error(error);
    }
  }

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featureImage, status, userId }
      );
    } catch (error) {}
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      result = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featureImage, status }
      );
    } catch (error) {}
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  //storage

  async uploadFile(file) {
    console.log("Creating a file");
    console.log(file);
    const fileId = ID.unique();
    console.log(`${fileId}`);
    try {
      const response = await this.storage.createFile(
        conf.appwriteBucketId,
        fileId,
        file
      );
      console.log("File apploud:");
      console.log(response);
      return response;
    } catch (error) {
      console.log("create file throw an error");
      console.log(error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch {}
  }

  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(conf.bucket, fileId).href;
    } catch (error) {}
  }
}

const service = new Service();

export default service;
