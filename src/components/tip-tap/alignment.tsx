"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
} from "lucide-react";
import { useCallback } from "react";

export function Alignment({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const currentAlign = useCallback(() => {
    if (editor.isActive({ textAlign: "center" }))
      return <AlignCenter size={16} />;
    if (editor.isActive({ textAlign: "right" }))
      return <AlignRight size={16} />;
    if (editor.isActive({ textAlign: "justify" }))
      return <AlignJustify size={16} />;
    return <AlignLeft size={16} />;
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 bg-accent text-accent-foreground"
        >
          {currentAlign()}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          disabled={!editor.can().setTextAlign("left")}
          className={editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""}
        >
          <AlignLeft size={16} className="mr-2" />
          Left
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          disabled={!editor.can().setTextAlign("center")}
          className={
            editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""
          }
        >
          <AlignCenter size={16} className="mr-2" />
          Center
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          disabled={!editor.can().setTextAlign("right")}
          className={editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""}
        >
          <AlignRight size={16} className="mr-2" />
          Right
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          disabled={!editor.can().setTextAlign("justify")}
          className={
            editor.isActive({ textAlign: "justify" }) ? "bg-accent" : ""
          }
        >
          <AlignJustify size={16} className="mr-2" />
          Justify
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
