"use client";

import { Toggle } from "@/components/ui/toggle";
import type { Editor } from "@tiptap/react";
import { Bold, Code, FileCode, Italic, Quote, Underline } from "lucide-react";

export function FormattingButtons({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <>
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().toggleBold()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Bold"
      >
        <Bold size={16} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().toggleItalic()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Italic"
      >
        <Italic size={16} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().toggleUnderline()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Underline"
      >
        <Underline size={16} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().toggleCode()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Code"
      >
        <Code size={16} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().toggleCodeBlock()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Code"
      >
        <FileCode size={16} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().toggleBlockquote()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Blockquote"
      >
        <Quote size={16} />
      </Toggle>
    </>
  );
}
