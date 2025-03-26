import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define a route for both images and videos
  imageUploader: f({
    image: { maxFileSize: "4MB" },
    video: { maxFileSize: "64MB" },
  })
    .middleware(async () => {
      // Optional: Add authentication checks here
      // const user = await getCurrentUser();
      // if (!user) throw new Error("Unauthorized");

      return { userId: "placeholder" }; // Replace with actual user ID if needed
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete", metadata, file);

      // Return file information to the client
      return {
        uploadedBy: metadata.userId,
        name: file.name,
        url: file.ufsUrl,
        size: file.size,
        type: file.type,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
