"use client";

import { useTipTapEditor } from "@/hooks/use-tiptap-editor";
import { Editor, EditorContent } from "@tiptap/react";
import { useLayoutEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import TipTapToolBar from "./toolbar";

interface TiptapEditorProps {
  onEditorReady?: (editor: Editor) => void;
}

const TiptapEditor = ({ onEditorReady }: TiptapEditorProps) => {
  const editor = useTipTapEditor();

  useLayoutEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="">
      <TipTapToolBar editor={editor} className="-mx-6" />

      <ScrollArea className="h-[700px] w-full py-4">
        <EditorContent editor={editor} className="max-w-none" />
      </ScrollArea>
    </div>
  );
};

export default TiptapEditor;
