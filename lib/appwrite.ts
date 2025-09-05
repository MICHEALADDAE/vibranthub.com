import { Client, Account, Databases, Storage, Avatars } from "appwrite";

const client = new Client();

client
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
      "https://syd.cloud.appwrite.io/v1",
  )
  .setProject(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "686a1b7400349bee6318",
  );

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export default client;
