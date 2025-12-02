import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class Auth_service {
  client = new Client();
  account;
  constructor() {
    this.account = new Account(
      this.client
        .setProject(config.backend_project_id)
        .setEndpoint(config.backend_url)
    );
  }
  async signup({ email, password, name }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      if (user) {
        return await this.signin({ email, password });
      }
    } catch (e) {
      console.error(e);
      throw e
    }
  }

  async signin({ email, password }) {
    try{
    const result = await this.account.createEmailPasswordSession({
      email,
      password,
    });
    return result
}
    catch (e){
        console.log(e)
        throw e
    }
  }

  async logout(){
    try{
        await this.account.deleteSessions();
       
    }
    catch(e){
        console.log(e)
        throw e
    }
  }

  async currentUser(){
    try {
        return await this.account.get()
    } catch (e) {
        console.log(e)
        throw e
    }
  }
}

const authservice = new Auth_service();
export default authservice;