"use client";

import { Toggle } from "@/components/ui/toggle";
import type { Editor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";

export function FormattingButtons({ editor }: { editor: Editor }) {
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
    </>
  );
}
