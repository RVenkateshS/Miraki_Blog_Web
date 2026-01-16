
// const conf = {
//     appwriteUrl: "https://sgp.cloud.appwrite.io/v1",
//     appwriteProjectId: "693ebf67003a24636813",
//     appwriteDatabaseId: "693ec79f003ae5af35cb",
//     appwriteCollectionId: "articles",
//     appwriteBucketId: "693ec976001121d9c6ae",
// }

// export default conf

 


const conf ={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    
    

}


export default conf