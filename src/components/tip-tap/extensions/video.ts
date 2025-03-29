import {
  getVimeoEmbedUrl,
  getYouTubeEmbedUrl,
  isVimeoUrl,
  isYouTubeUrl,
} from "@/lib/video-utils";
import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoComponent from "../video-component";

export interface VideoOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add a video
       */
      setVideo: (options: {
        src: string;
        title?: string;
        width?: string;
        height?: string;
        controls?: boolean;
        autoplay?: boolean;
        loop?: boolean;
        muted?: boolean;
        isLocalFile?: boolean;
        fileData?: {
          name: string;
          type: string;
          size: number;
          lastModified: number;
        };
      }) => ReturnType;
    };
  }
}

export const Video = Node.create<VideoOptions>({
  name: "video",

  group: "block",

  selectable: true,

  draggable: true,

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "auto",
      },
      controls: {
        default: true,
      },
      autoplay: {
        default: false,
      },
      loop: {
        default: false,
      },
      muted: {
        default: false,
      },
      // Flag to indicate if this is a local file that needs to be uploaded
      isLocalFile: {
        default: false,
      },
      // Store file metadata for later upload
      fileData: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
      },
      // Add this to make YouTube divs parseable again
      {
        tag: "div[data-type=youtube-video]",
        getAttrs: (node) => {
          if (typeof node === "string") return null;
          const element = node as HTMLElement;
          return {
            src: element.getAttribute("data-src"),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src } = HTMLAttributes;

    if (!src) {
      return ["video"];
    }

    // Handle YouTube videos
    if (isYouTubeUrl(src)) {
      return [
        "div",
        {
          "data-type": "youtube-video",
          "data-src": src,
          class: "youtube-video-container",
        },
        [
          "iframe",
          {
            src: getYouTubeEmbedUrl(src),
            width: "560",
            height: "315",
            frameborder: "0",
            allowfullscreen: "true",
          },
        ],
      ];
    }

    // Handle Vimeo videos
    if (isVimeoUrl(src)) {
      return [
        "div",
        {
          "data-type": "vimeo-video",
          "data-src": src,
          class: "vimeo-video-container",
        },
        [
          "iframe",
          {
            src: getVimeoEmbedUrl(src),
            width: "560",
            height: "315",
            frameborder: "0",
            allowfullscreen: "true",
          },
        ],
      ];
    }

    // Ensure a valid return for non-YouTube and non-Vimeo videos
    return [
      "video",
      {
        src,
        controls: HTMLAttributes.controls ? "true" : null,
        autoplay: HTMLAttributes.autoplay ? "true" : null,
        loop: HTMLAttributes.loop ? "true" : null,
        muted: HTMLAttributes.muted ? "true" : null,
        width: HTMLAttributes.width,
        height: HTMLAttributes.height,
      },
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent);
  },
});

export default Video;
