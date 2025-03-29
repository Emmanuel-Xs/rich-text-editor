import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ActionButtonComponent from "../action-button-component";

export interface ActionButtonOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

export interface ActionButtonAttributes {
  href: string;
  text: string;
  display: "inline" | "block";
  width: string;
  textColor: string;
  backgroundColor: string;
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  target?: string;
  class?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    actionButton: {
      /**
       * Add an action button
       */
      setActionButton: (options: ActionButtonAttributes) => ReturnType;
    };
  }
}

export const ActionButton = Node.create<ActionButtonOptions>({
  name: "actionButton",

  group: "inline",

  inline: true,

  selectable: true,

  draggable: true,

  addAttributes() {
    return {
      href: {
        default: null,
      },
      text: {
        default: "Click me",
      },
      display: {
        default: "inline",
      },
      width: {
        default: "auto",
      },
      textColor: {
        default: "#ffffff",
      },
      backgroundColor: {
        default: "#3b82f6",
      },
      borderStyle: {
        default: "solid",
      },
      borderWidth: {
        default: "1px",
      },
      borderColor: {
        default: "#3b82f6",
      },
      borderRadius: {
        default: "0.25rem",
      },
      target: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="action-button"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "action-button",
      }),
      HTMLAttributes.text,
    ];
  },

  addCommands() {
    return {
      setActionButton:
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
    return ReactNodeViewRenderer(ActionButtonComponent);
  },
});

export default ActionButton;
