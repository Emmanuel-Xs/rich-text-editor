import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageComponent from "../image-component";

export interface ImageOptions {
  HTMLAttributes: Record<string, unknown>;
}

interface FileData {
  name: string;
  type: string;
  size: number;
  lastModified: number;
}

interface CustomImageAttributes {
  src: string | null;
  alt?: string | null;
  title?: string | null;
  isLocalFile?: boolean;
  fileData?: FileData | null;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customImage: {
      /**
       * Add an image
       */
      setCustomImage: (options: CustomImageAttributes) => ReturnType;
    };
  }
}

export const CustomImage = Node.create<ImageOptions>({
  name: "customImage",

  group: "block",

  selectable: true,

  draggable: true,

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null as string | null,
      },
      alt: {
        default: null as string | null,
      },
      title: {
        default: null as string | null,
      },
      isLocalFile: {
        default: false as boolean,
      },
      fileData: {
        default: null as FileData | null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setCustomImage:
        (options: CustomImageAttributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});

export default CustomImage;
