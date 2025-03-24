"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Editor } from "@tiptap/react";
import { ChevronDown } from "lucide-react";

// Font options
const fontOptions = [
  "Inter",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier",
  "Courier New",
];

export function FontFamilyDropdown({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const currentTextStyle = editor.getAttributes("textStyle") || {};
  const activeFontFamily = currentTextStyle.fontFamily || "Inter";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 bg-accent text-accent-foreground"
        >
          <span style={{ fontFamily: activeFontFamily }}>
            {activeFontFamily.split(" ")[0]}
          </span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>SANS SERIF</DropdownMenuLabel>
        <DropdownMenuGroup>
          {fontOptions.slice(0, 3).map((font) => (
            <DropdownMenuItem
              key={font}
              onClick={() => editor.chain().focus().setFontFamily(font).run()}
              disabled={!editor.can().setFontFamily(font)}
              className={activeFontFamily === font ? "bg-accent font-bold" : ""}
              style={{ fontFamily: font }}
            >
              {font}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>SERIF</DropdownMenuLabel>
        <DropdownMenuGroup>
          {fontOptions.slice(3, 6).map((font) => (
            <DropdownMenuItem
              key={font}
              onClick={() => editor.chain().focus().setFontFamily(font).run()}
              disabled={!editor.can().setFontFamily(font)}
              className={activeFontFamily === font ? "bg-accent font-bold" : ""}
              style={{ fontFamily: font }}
            >
              {font}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>MONOSPACE</DropdownMenuLabel>
        <DropdownMenuGroup>
          {fontOptions.slice(6).map((font) => (
            <DropdownMenuItem
              key={font}
              onClick={() => editor.chain().focus().setFontFamily(font).run()}
              disabled={!editor.can().setFontFamily(font)}
              className={activeFontFamily === font ? "bg-accent font-bold" : ""}
              style={{ fontFamily: font }}
            >
              {font}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
