"use client";

import TiptapEditor from "@/components/tip-tap/editor";
import { Button } from "@/components/ui/button";
import {
  extractLocalMediaFiles,
  extractYouTubeLinks,
  updateMediaUrls,
} from "@/lib/extract-local-media";
import { useUploadThing } from "@/lib/uploadthing";
import { Editor } from "@tiptap/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Load saved data from localStorage when the component mounts
  // In Home.tsx
  useEffect(() => {
    if (!editorInstance) return;

    const storedContent = localStorage.getItem("previewContent");
    if (storedContent) {
      try {
        const parsedContent = JSON.parse(storedContent);
        setTitle(parsedContent.title);
        setExcerpt(parsedContent.excerpt);

        // Wait a bit to make sure editor is fully initialized
        setTimeout(() => {
          editorInstance.commands.setContent(parsedContent.content);
          console.log("Loaded content into editor");
        }, 100);
      } catch (error) {
        console.error("Error parsing stored content:", error);
      }
    }
  }, [editorInstance]);

  // Use the uploadThing hook with the correct endpoint
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (!editorInstance) return;

      console.log("Files uploaded successfully:", res);

      // Create a mapping of local file identifiers to uploaded URLs
      const mediaMap: Record<string, [string, string]> = res.reduce(
        (acc, file) => {
          // Use the file's original name as the key
          // Store an array with [originalName, uploadKey]
          acc[file.name] = [file.name, file.ufsUrl];
          return acc;
        },
        {} as Record<string, [string, string]>
      );

      // Update the editor content with the new URLs
      updateMediaUrls(editorInstance, mediaMap);

      // Get the content after updating URLs
      saveAndNavigate();
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      alert("Error uploading files: " + error.message);
      setIsSubmitting(false);
    },
  });

  const saveAndNavigate = () => {
    if (!editorInstance) return;

    // Get current editor content
    const content = editorInstance.getHTML();
    const youtubeLinks = extractYouTubeLinks(content);

    // Save to localStorage
    localStorage.setItem(
      "previewContent",
      JSON.stringify({
        title,
        excerpt,
        content,
        uploadedFiles: youtubeLinks,
      })
    );

    // Navigate to preview
    router.push("/preview");
    setIsSubmitting(false);
    editorInstance.setEditable(true);
  };

  const handleSubmit = async () => {
    if (!editorInstance) {
      alert("Editor not initialized");
      return;
    }

    setIsSubmitting(true);
    editorInstance.setEditable(false);

    try {
      // Extract local media files from the editor
      const localFiles = extractLocalMediaFiles(editorInstance);

      if (localFiles.length === 0) {
        // No files to upload, just save and navigate
        saveAndNavigate();
        return;
      }

      // Convert blob URLs to File objects for upload
      const filesToUpload = await Promise.all(
        localFiles.map(async (file) => {
          const response = await fetch(file.blobUrl);
          const blob = await response.blob();

          return new File([blob], file.id, {
            type: file.fileData.type,
            lastModified: file.fileData.lastModified,
          });
        })
      );

      // Start the upload process
      await startUpload(filesToUpload);
    } catch (error) {
      console.error("Error preparing files for upload:", error);
      alert("Error preparing files for upload");
      setIsSubmitting(false);
      editorInstance.setEditable(true);
    }
  };

  return (
    <main className="w-[min(calc(100%-2rem),_800px)] mx-auto mt-12 pb-20">
      <section className="border border-gray-400 bg-accent rounded-lg p-6 space-y-10 overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <button className="border w-fit px-4 py-2 rounded-md border-gray-300 bg-gray-50 hover:bg-transparent">
              Add a Cover Image
            </button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || isUploading}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
              size="lg"
            >
              {isSubmitting || isUploading
                ? "Uploading & Submitting..."
                : "Submit Product"}
            </Button>
          </div>
          <input
            type="text"
            placeholder="New product title here..."
            className="border-none outline-none focus:outline-none focus:ring-0 text-3xl sm:text-4xl placeholder:text-gray-700 font-bold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Excerpt here..."
            className="border-none outline-none focus:outline-none focus:ring-0 text-xl"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <TiptapEditor onEditorReady={setEditorInstance} />
      </section>
    </main>
  );
}
