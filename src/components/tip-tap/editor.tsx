"use client";

import { useTipTapEditor } from "@/hooks/use-tiptap-editor";
import { EditorContent } from "@tiptap/react";
import TipTapToolBar from "./toolbar";

const TiptapEditor = () => {
  const editor = useTipTapEditor();

  if (!editor) return null;

  return (
    <>
      <TipTapToolBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default TiptapEditor;
