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
import { Input } from "@/components/ui/input";
import type { Editor } from "@tiptap/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Font size options
const fontSizeOptions = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "40px",
  "48px",
  "64px",
];

export function FontSizeDropdown({ editor }: { editor: Editor }) {
  const [customFontSize, setCustomFontSize] = useState("");

  const currentTextStyle = editor.getAttributes("textStyle") || {};
  const activeFontSize = currentTextStyle.fontSize || "16px";

  const handleCustomFontSize = () => {
    if (customFontSize && !isNaN(Number(customFontSize))) {
      editor.chain().focus().setFontSize(`${customFontSize}px`).run();
      setCustomFontSize("");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 bg-accent text-accent-foreground"
        >
          <span>{activeFontSize}</span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>FONT SIZE</DropdownMenuLabel>
        <DropdownMenuGroup>
          {fontSizeOptions.map((fontSize) => (
            <DropdownMenuItem
              key={fontSize}
              onClick={() => editor.chain().focus().setFontSize(fontSize).run()}
              disabled={!editor.can().setFontSize(fontSize)}
              className={
                activeFontSize === fontSize ? "bg-accent font-bold" : ""
              }
            >
              {fontSize}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex items-center p-2">
          <Input
            type="number"
            min="1"
            placeholder="Custom size"
            value={customFontSize}
            onChange={(e) => setCustomFontSize(e.target.value)}
            disabled={!editor.can().setFontSize(customFontSize)}
            className="h-8 w-20 text-center"
          />
          <Button
            onClick={handleCustomFontSize}
            size="sm"
            className="ml-2"
            disabled={!editor.can().setFontSize(customFontSize)}
          >
            Set
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
