"use client";

import { Button } from "@/components/ui/button";
import { YouTubeLink } from "@/lib/extract-local-media";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PreviewContent {
  title: string;
  excerpt: string;
  content: string;
  uploadedFiles: (
    | YouTubeLink
    | {
        url: string;
        serverData: {
          uploadedBy: string;
          name: string;
          url: string;
          size: number;
          type: string;
        };
        name: string;
        type: string;
        size: number;
        key: string;
        lastModified?: number | undefined;
        customId: string | null;
        appUrl: string;
        ufsUrl: string;
        fileHash: string;
      }
  )[];
}

export default function PreviewPage() {
  const [content, setContent] = useState<PreviewContent | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get the content from localStorage
    const storedContent = localStorage.getItem("previewContent");
    if (storedContent) {
      try {
        const parsedContent = JSON.parse(storedContent);
        setContent(parsedContent);
      } catch (error) {
        console.error("Error parsing stored content:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleEdit = () => {
    router.push("/");
  };

  const handlePublish = () => {
    // Here you would typically save to a database
    alert("Product published successfully!");
    // Clear the localStorage
    localStorage.removeItem("previewContent");
    // Redirect to a success page or home
    router.push("/");
  };

  if (loading) {
    return (
      <div className="w-[min(calc(100%-2rem),_800px)] mx-auto mt-12 flex justify-center">
        <p>Loading preview...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-[min(calc(100%-2rem),_800px)] mx-auto mt-12 flex flex-col items-center gap-4">
        <p>No content to preview. Please create a product first.</p>
        <Button onClick={() => router.push("/")}>Go to Editor</Button>
      </div>
    );
  }

  return (
    <main className="w-[min(calc(100%-2rem),_800px)] mx-auto mt-12 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Preview Your Product</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            Edit
          </Button>
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>

      <section className="border border-gray-400 bg-accent rounded-lg p-6 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold">{content.title}</h1>
        {content.excerpt && (
          <p className="text-xl text-gray-700">{content.excerpt}</p>
        )}

        <div
          className="prose max-w-none tiptap"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />

        {content.uploadedFiles && content.uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
            <ul className="list-disc pl-5">
              {content.uploadedFiles.map((file, index) => {
                if (file.type === "youtube" || file.type === "vimeo") {
                  return (
                    <li key={index} className="mt-4">
                      <iframe
                        width="560"
                        height="315"
                        src={file.url}
                        title={
                          file.type === "youtube"
                            ? "YouTube video"
                            : "Vimeo video"
                        }
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </li>
                  );
                }

                // Ensure `file` has a `name` property before using it
                if ("name" in file) {
                  return (
                    <li key={index}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {file.name}
                      </a>
                    </li>
                  );
                }

                return null; // If it doesn't match any condition, return null
              })}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
