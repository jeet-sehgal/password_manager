import { Client, TablesDB, Query, ID, Storage } from "appwrite";
import config from "../config/config";

class DataService {
  client = new Client();
  tablesDB;
  storage;
  tableID = config.backend_password_table;
  databaseID = config.backend_database_id;
  bucketID = config.backend_profile_img_bucket;

  constructor() {
    this.tablesDB = new TablesDB(
      this.client
        .setEndpoint(config.backend_url)
        .setProject(config.backend_project_id)
    );
    this.storage = new Storage(
      this.client
        .setEndpoint(config.backend_url)
        .setProject(config.backend_project_id)
    );
  }

  async insertPost({ title, website, username, password, category, type="strong",userID }) {
    try {
      const result = await this.tablesDB.createRow({
        databaseId: this.databaseID,
        tableId: this.tableID,
        rowId: ID.unique(),
        data: {
          username,
          title,
          website,
          userID,
          password,
          category,
          type,
        },
      });
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deletePost(id) {
    try {
      const result = await this.tablesDB.deleteRow({
        databaseId: this.databaseID,
        tableId: this.tableID,
        rowId: id,
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async updatePost({ title, website, username, userID,password, category, id, type, }) {
    try {
      const result = await this.tablesDB.updateRow({
        databaseId: this.databaseID,
        tableId: this.tableID,
        rowId: id,
        data: {
          title,
          website,
          userID,
          password,
          username,
          category,
          type,
        },
      });
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPosts(userID) {
    try {
      const result = await this.tablesDB.listRows({
        databaseId: this.databaseID,
        tableId: this.tableID,
        queries: [Query.equal("userID", userID)],
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getPost({ userID, id }) {
    try {
      const result = await this.tablesDB.listRows({
        databaseId: this.databaseID,
        tableId: this.tableID,

        queries: Query.and([
          Query.equal("userID", userID),
          Query.equal("$id", id),
        ]),
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async insertImg(file) {
    try {
      return await this.storage.createFile({
        bucketId: this.bucketID,
        fileId: ID.unique(),
        file,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteImg(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: this.bucketID,
        fileId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.storage.getFileView({
        bucketId: this.bucketID,
        fileId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateFile({ old, newFile }) {
    try {
      await this.deleteImg(old);
      return await this.insertImg(newFile);
    } catch (e) {
      console.log(e);
    }
  }
}

const dataService = new DataService();

export default dataService;
