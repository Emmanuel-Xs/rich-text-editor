"use client";

import { Button } from "@/components/ui/button";
import {
  CustomPopover,
  CustomPopoverContent,
  CustomPopoverTrigger,
} from "@/components/ui/custom-popover";
import type { Editor } from "@tiptap/react";
import { Palette, Undo } from "lucide-react";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

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

export function ColorPickerButton({ editor }: { editor: Editor }) {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    editor.chain().focus().setColor(newColor).run();
  };

  return (
    <CustomPopover>
      <CustomPopoverTrigger disabled={!editor.can().toggleMark("textStyle")}>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          style={{
            borderColor: editor.getAttributes("textStyle").color,
            borderWidth: editor.isActive("textStyle", { color })
              ? "2px"
              : "none",
            borderStyle: editor.isActive("textStyle", { color })
              ? "solid"
              : "none",
          }}
          disabled={!editor.can().toggleMark("textStyle")}
        >
          <Palette size={16} />
        </Button>
      </CustomPopoverTrigger>
      <CustomPopoverContent className="p-3">
        <div className="space-y-2 w-full">
          <HexColorPicker
            className="w-full min-w-full"
            color={color}
            onChange={handleColorChange}
          />
          <HexColorInput
            type="text"
            color={color}
            onChange={handleColorChange}
            className="mt-2 border rounded-sm px-2 py-1 w-full"
            disabled={!editor.can().toggleMark("textStyle")}
          />
          <div className="grid grid-cols-6 gap-1">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                className="w-8 h-8 rounded-md cursor-pointer"
                style={{ backgroundColor: colorOption.value }}
                title={colorOption.label}
                onClick={() => {
                  editor.chain().focus().setColor(colorOption.value).run();
                  setColor(colorOption.value);
                }}
                disabled={!editor.can().toggleMark("textStyle")}
              />
            ))}
            <button
              className="w-7 h-7 mt-2 rounded-md cursor-pointer border border-gray-300 flex items-center justify-center"
              title="Remove color"
              onClick={() => {
                editor.chain().focus().unsetColor().run();
              }}
              disabled={!editor.isActive("textStyle")}
            >
              <Undo size={14} />
            </button>
          </div>
        </div>
      </CustomPopoverContent>
    </CustomPopover>
  );
}
