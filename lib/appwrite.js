import { Account, Client, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endPoint: "https://cloud.appwrite.io",
  platform: "com.souvik.aora",
  projectId: "6700ae450021fc09b65a",
  databaseId: "6700b2460008bd16c699",
  userCollectionId: "6700b289003336e45223",
  videoCollectionId: "6700b2aa00202d64f236",
  storageId: "6700b7600032c94b6bfc",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endPoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);

// Register User
export const createUser = () => {
  account.create(ID.unique(), "souvik@gmail.com", "Souvik@123", "souvik").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
