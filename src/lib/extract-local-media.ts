import type { Editor } from "@tiptap/react";

interface LocalMediaFile {
  id: string;
  type: "image" | "video";
  blobUrl: string;
  fileData: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
  };
}

interface NodeAttributes {
  src: string;
  title?: string;
  isLocalFile?: boolean;
  fileData?: {
    name?: string;
    type?: string;
    size?: number;
    lastModified?: number;
  };
}

interface TiptapNode {
  type: string;
  attrs?: NodeAttributes;
  content?: TiptapNode[];
}

export function extractLocalMediaFiles(editor: Editor): LocalMediaFile[] {
  const localFiles: LocalMediaFile[] = [];
  const json = editor.getJSON() as { content?: TiptapNode[] };

  // Function to recursively search for local media files in the document
  const findLocalMedia = (node: TiptapNode) => {
    if (node.attrs?.isLocalFile && node.attrs.src) {
      localFiles.push({
        id:
          node.attrs.title || `${node.type}-${Date.now()}-${localFiles.length}`,
        type: node.type === "video" ? "video" : "image",
        blobUrl: node.attrs.src,
        fileData: {
          name: node.attrs.fileData?.name || "",
          type: node.attrs.fileData?.type || "",
          size: node.attrs.fileData?.size || 0,
          lastModified: node.attrs.fileData?.lastModified || Date.now(),
        },
      });
    }

    if (node.content) {
      node.content.forEach(findLocalMedia);
    }
  };

  json.content?.forEach(findLocalMedia);

  return localFiles;
}

// Helper function to update the editor content with permanent URLs after upload
export const updateMediaUrls = (
  editor: Editor,
  mediaMap: Record<string, [originalName: string, uploadedUrl: string]>
) => {
  const { doc, tr } = editor.state;
  let modified = false;

  doc.descendants((node, pos) => {
    const nodeAttrs = node.attrs as NodeAttributes | undefined;
    if (!nodeAttrs) return;

    if (node.type.name === "customImage" || node.type.name === "video") {
      const { src, title } = nodeAttrs;

      // Find matching entry in the mediaMap
      const matchingEntry = Object.entries(mediaMap).find(
        ([, [originalName]]) =>
          src.includes(originalName) || title === originalName
      );

      if (matchingEntry) {
        const [, [, uploadedUrl]] = matchingEntry;

        const newAttrs: NodeAttributes = {
          ...nodeAttrs,
          src: uploadedUrl,
          isLocalFile: false,
          fileData: {
            name: title || nodeAttrs.fileData?.name || "",
            type: nodeAttrs.fileData?.type || "",
            size: nodeAttrs.fileData?.size || 0,
            lastModified: nodeAttrs.fileData?.lastModified || Date.now(),
          },
        };

        tr.setNodeMarkup(pos, undefined, newAttrs);
        modified = true;
      }
    }
  });

  if (modified) {
    editor.view.dispatch(tr);
  }
};

// YouTube Link Extraction
export interface YouTubeLink {
  type: "youtube";
  url: string;
}

export function extractYouTubeLinks(content: string): YouTubeLink[] {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/g;
  const matches = [...content.matchAll(regex)];

  return matches.map((match) => ({
    type: "youtube",
    url: `https://www.youtube.com/embed/${match[1]}`,
  }));
}
