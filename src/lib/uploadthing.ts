import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

// export const getUploadUrl = (fileKey: string) => {
//   const UPLOADTHING_APP_ID = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;
//   if (!UPLOADTHING_APP_ID) {
//     throw new Error(
//       "UPLOADTHING_APP_ID is not defined in environment variables."
//     );
//   }
//   return `https://${UPLOADTHING_APP_ID}.ufs.sh/f/${fileKey}`;
// };
