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

        {/* We no longer need to display YouTube videos here as they're now preserved in the content */}
      </section>
    </main>
  );
}
