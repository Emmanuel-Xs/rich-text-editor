import type { Editor } from "@tiptap/react";
import { RedoIcon, UndoIcon } from "lucide-react";
import { Toggle } from "../ui/toggle";

export default function UndoRedo({ editor }: { editor: Editor }) {
  return (
    <>
      <Toggle
        pressed={editor.isActive("undo")}
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Undo"
      >
        <UndoIcon size={16} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("redo")}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        size="sm"
        className="h-8 w-8 p-0"
        title="Redo"
      >
        <RedoIcon size={16} />
      </Toggle>
    </>
  );
}
