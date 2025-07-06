import { account } from "@/lib/appwrite";

export async function testAppwriteConnection() {
  try {
    // Try to get account info (this will work even without being logged in)
    await account.get();
    console.log("✅ Appwrite connection successful");
    return true;
  } catch (error) {
    // If we get a 401, it means connection is working but user is not authenticated
    if (error instanceof Error && error.message.includes("401")) {
      console.log("✅ Appwrite connection successful (not authenticated)");
      return true;
    }
    console.error("❌ Appwrite connection failed:", error);
    return false;
  }
}

export async function pingAppwrite() {
  try {
    const endpoint =
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
      "https://syd.cloud.appwrite.io/v1";
    const response = await fetch(endpoint + "/health", {
      method: "GET",
    });

    if (response.ok) {
      console.log("✅ Appwrite server is healthy");
      return true;
    } else {
      console.log("⚠️ Appwrite server responded with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Failed to ping Appwrite server:", error);
    return false;
  }
}
