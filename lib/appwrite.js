import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endPoint: "https://cloud.appwrite.io/v1",
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
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
/**
 * The function createUser creates a new user account with a unique ID, email, password, and username,
 * generates an avatar URL based on the username, signs in the user, and creates a new document in a
 * database with user information.
 * @param email - The `createUser` function you provided seems to be creating a new user account with
 * the given email, password, and username. It then generates an avatar URL based on the username,
 * signs in the user, and creates a new document in a database with user information.
 * @param password - The `password` parameter in the `createUser` function is used to store the
 * password for the new user account being created. It is one of the required pieces of information
 * needed to create a new user account along with the `email` and `username`.
 * @param username - The `createUser` function you provided is an asynchronous function that creates a
 * new user account with the given email, password, and username. It uses various helper functions like
 * `account.create`, `avatars.getInitials`, `signIn`, and `databases.createDocument` to complete the
 * user creation process
 * @returns The `createUser` function is returning the newly created user object after successfully
 * creating a new account, signing in, and creating a new document in the database with the user's
 * information.
 */
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * The signIn function takes an email and password as parameters, creates a session using the email and
 * password, and returns the session if successful.
 * @param email - Email address of the user trying to sign in.
 * @param password - The `password` parameter in the `signIn` function is the user's password that they
 * use to sign in to their account. It is a sensitive piece of information that should be securely
 * handled and not exposed to unauthorized users.
 * @returns The `signIn` function returns the session object that is created after successfully signing
 * in with the provided email and password.
 */
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * The function `getCurrentUser` retrieves the current user's information based on their account ID.
 * @returns The `getCurrentUser` function is returning the first document of the `currentUser` array.
 */
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * The function getAllPosts retrieves all posts from a specified database collection in descending
 * order based on creation date.
 * @returns The function `getAllPosts` is returning the documents of all posts fetched from the
 * database in descending order based on the creation timestamp.
 */
export const getAllPosts = async () => {
  try {
    const allPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    if (!allPosts) throw Error;

    return allPosts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * The function `getLatestPosts` retrieves the latest 7 posts from a specified database collection in
 * descending order based on creation date.
 * @returns The function `getLatestPosts` is returning an array of the latest 7 documents/posts from
 * the specified database and collection, ordered by the creation date in descending order.
 */
export const getLatestPosts = async () => {
  try {
    const allPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    if (!allPosts) throw Error;

    return allPosts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * The function `searchPosts` searches for posts in a database based on a query and returns the
 * matching documents.
 * @param query - The `query` parameter in the `searchPosts` function represents the search term that
 * will be used to search for posts in the database based on their titles.
 * @returns The function `searchPosts` is returning an array of documents that match the search query
 * provided.
 */
export const searchPosts = async (query) => {
  try {
    const allPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );
    if (!allPosts) throw Error;

    return allPosts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * This function retrieves all posts created by a specific user from a database.
 * @param userId - The `userId` parameter in the `getUserPosts` function represents the unique
 * identifier of the user for whom you want to retrieve posts. This function fetches all posts from a
 * database that belong to the user with the specified `userId`.
 * @returns The function `getUserPosts` is returning an array of documents representing posts created
 * by a specific user with the provided `userId`. If the operation is successful, it returns the array
 * of documents. If an error occurs during the process, it will log the error and throw a new Error
 * with the same message.
 */
export const getUserPosts = async (userId) => {
  try {
    const allPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    if (!allPosts) throw Error;

    return allPosts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * The function `signOut` asynchronously deletes the current session and returns the deleted session,
 * handling any errors that may occur.
 * @returns The `signOut` function is returning the session that was deleted using the `deleteSession`
 * method.
 */
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * The getFilePreview function retrieves a file preview URL based on the file type (video or image) and
 * file ID.
 * @param fileId - The `fileId` parameter is the unique identifier of the file for which you want to
 * generate a preview. It is used to locate and retrieve the file from the storage system.
 * @param type - The `type` parameter in the `getFilePreview` function determines the type of file for
 * which you want to generate a preview. It can have two possible values: "video" or "image".
 * @returns The function `getFilePreview` is returning the `fileUrl` after fetching it based on the
 * `fileId` and `type` parameters. If the `type` is "video", it fetches the file view using
 * `storage.getFileView` with the `appwriteConfig.storageId` and `fileId`. If the `type` is "image", it
 * fetches the file view with
 */
export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFileView(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * The `uploadFile` function uploads a file to a storage service and returns a preview URL for the
 * uploaded file.
 * @param file - The `file` parameter in the `uploadFile` function is an object that contains
 * information about the file to be uploaded. It typically includes the following properties:
 * @param type - The `type` parameter in the `uploadFile` function is used to specify the type of file
 * being uploaded. It is passed as an argument to the function and is used internally to determine how
 * to handle the uploaded file.
 * @returns The `uploadFile` function returns the URL of the uploaded file after successfully uploading
 * it and getting the file preview.
 */
export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * The function `createVideo` uploads a thumbnail and video file, then creates a new post document in a
 * database with the provided form data.
 * @param form - The `form` parameter in the `createVideo` function seems to contain information
 * related to creating a new video post. It likely includes the following properties:
 * @returns The `createVideo` function returns the newly created post object after uploading the
 * thumbnail and video files and creating a document in the specified database collection.
 */
export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        creator: form.userId,
        title: form.title,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        prompt: form.prompt,
      }
    );
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};
