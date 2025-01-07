import conf from "../conf/conf";
import { Client,ID,Databases,Storage} from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
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
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
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
      console.error("Error deleting post:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    const fileId = ID.unique();
    try {
      return await this.storage.createFile(conf.appwriteBucketId, fileId, file);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error getting file preview:", error);
      throw error;
    }
  }
}

const service = new Service();
export default service;
