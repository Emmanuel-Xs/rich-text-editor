import { Editor } from "@tiptap/core";

interface LocalMediaFile {
  id: string;
  blobUrl: string;
  fileData: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
  };
}

export interface YouTubeLink {
  type: "youtube" | "vimeo";
  url: string;
}

export function extractLocalMediaFiles(editor: Editor): LocalMediaFile[] {
  const localFiles: LocalMediaFile[] = [];

  // Process images
  editor.state.doc.descendants((node) => {
    if (node.type.name === "customImage" && node.attrs.isLocalFile) {
      localFiles.push({
        id: node.attrs.fileData?.name || `file-${Date.now()}`,
        blobUrl: node.attrs.src,
        fileData: node.attrs.fileData,
      });
    }
    return true;
  });

  // Process videos
  editor.state.doc.descendants((node) => {
    if (node.type.name === "video" && node.attrs.isLocalFile) {
      localFiles.push({
        id: node.attrs.fileData?.name || `video-${Date.now()}`,
        blobUrl: node.attrs.src,
        fileData: node.attrs.fileData,
      });
    }
    return true;
  });

  return localFiles;
}

export function extractYouTubeLinks(htmlContent: string): YouTubeLink[] {
  const youtubeLinks: YouTubeLink[] = [];

  // Look for data attributes in video wrappers
  const regex = /data-video-type="(youtube|vimeo)".*?data-video-src="([^"]*)"/g;
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    const type = match[1] as "youtube" | "vimeo";
    const url = match[2];

    youtubeLinks.push({
      type,
      url: type === "youtube" ? getYouTubeEmbedUrl(url) : getVimeoEmbedUrl(url),
    });
  }

  return youtubeLinks;
}

export function updateMediaUrls(
  editor: Editor,
  mediaMap: Record<string, [string, string]>
) {
  // Update image URLs
  editor.state.doc.descendants((node, pos) => {
    if (
      node.type.name === "customImage" &&
      node.attrs.isLocalFile &&
      node.attrs.fileData?.name &&
      mediaMap[node.attrs.fileData.name]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [originalName, newUrl] = mediaMap[node.attrs.fileData.name];
      editor
        .chain()
        .setNodeSelection(pos)
        .updateAttributes("customImage", {
          src: newUrl,
          isLocalFile: false,
        })
        .run();
    }
    return true;
  });

  // Update video URLs
  editor.state.doc.descendants((node, pos) => {
    if (
      node.type.name === "video" &&
      node.attrs.isLocalFile &&
      node.attrs.fileData?.name &&
      mediaMap[node.attrs.fileData.name]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [originalName, newUrl] = mediaMap[node.attrs.fileData.name];
      editor
        .chain()
        .setNodeSelection(pos)
        .updateAttributes("video", {
          src: newUrl,
          isLocalFile: false,
        })
        .run();
    }
    return true;
  });
}

// Helper functions to check if a URL is from YouTube or Vimeo
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isYouTubeUrl(url: string): boolean {
  return /youtu\.?be/i.test(url);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isVimeoUrl(url: string): boolean {
  return /vimeo/i.test(url);
}

// Helper functions to get embed URLs
function getYouTubeEmbedUrl(url: string): string {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
}

function getVimeoEmbedUrl(url: string): string {
  const regExp =
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  const match = url.match(regExp);
  if (match && match[3]) {
    return `https://player.vimeo.com/video/${match[3]}`;
  }
  return url;
}
