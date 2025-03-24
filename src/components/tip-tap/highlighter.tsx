"use client";

import { Button } from "@/components/ui/button";
import type { Editor } from "@tiptap/react";
import { Highlighter, Undo } from "lucide-react";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
  CustomPopover,
  CustomPopoverContent,
  CustomPopoverTrigger,
} from "../ui/custom-popover";

interface ColorOption {
  value: string;
  label: string;
}

// Predefined colors
const colorOptions: ColorOption[] = [
  { value: "#FF6B6B", label: "Red" },
  { value: "#FFD166", label: "Yellow" },
  { value: "#06D6A0", label: "Green" },
  { value: "#118AB2", label: "Blue" },
  { value: "#073B4C", label: "Dark Blue" },
  { value: "#9D4EDD", label: "Purple" },
];

export function HighlighterButton({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const [highlightColor, setHighlightColor] = useState("#FFFF00");

  const handleHighlightChange = (newHighlight: string) => {
    setHighlightColor(newHighlight);
    editor.chain().focus().setHighlight({ color: newHighlight }).run();
  };

  return (
    <CustomPopover>
      <CustomPopoverTrigger disabled={!editor.can().toggleHighlight()}>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          style={{
            borderColor: editor.getAttributes("highlight").color,
            borderWidth: editor.isActive("highlight") ? "2px" : "none",
            borderStyle: editor.isActive("highlight") ? "solid" : "none",
          }}
          disabled={!editor.can().toggleHighlight()}
          title="Highlight"
        >
          <Highlighter size={16} />
        </Button>
      </CustomPopoverTrigger>
      <CustomPopoverContent className="w-fit p-3">
        <div className="space-y-2 w-full">
          <HexColorPicker
            color={highlightColor}
            onChange={handleHighlightChange}
            className="w-full min-w-full"
          />
          <HexColorInput
            type="text"
            color={highlightColor}
            onChange={handleHighlightChange}
            className="mt-2 border rounded-sm px-2 py-1 w-full"
            disabled={!editor.can().toggleHighlight()}
          />
          <div className="grid grid-cols-6 gap-1">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                className="w-8 h-8 rounded-md cursor-pointer"
                style={{ backgroundColor: colorOption.value }}
                title={colorOption.label}
                onClick={(e) => {
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: colorOption.value })
                    .run();
                }}
                disabled={!editor.can().toggleHighlight()}
              />
            ))}
            <button
              className="w-7 h-7 mt-2 rounded-md cursor-pointer border border-gray-300 flex items-center justify-center"
              title="Remove highlight"
              onClick={(e) => {
                editor.chain().focus().unsetHighlight().run();
              }}
              disabled={!editor.isActive("highlight")}
            >
              <Undo size={14} />
            </button>
          </div>
        </div>
      </CustomPopoverContent>
    </CustomPopover>
  );
}
