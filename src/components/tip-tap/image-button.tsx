import type { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";

export function ImageButton({ editor }: { editor: Editor }) {
  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <button
      onClick={addImage}
      className="p-2 rounded border bg-gray-100 hover:bg-gray-200"
    >
      <ImageIcon size={18} />
    </button>
  );
}
