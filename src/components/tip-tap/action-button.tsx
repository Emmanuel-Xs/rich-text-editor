"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CustomPopover,
  CustomPopoverClose,
  CustomPopoverContent,
  CustomPopoverTrigger,
} from "@/components/ui/custom-popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Editor } from "@tiptap/react";
import { CommandIcon, Link2Icon, X } from "lucide-react";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import type { ActionButtonAttributes } from "./extensions/action-button";

interface ActionButtonProps {
  editor: Editor;
}

export function ActionButton({ editor }: ActionButtonProps) {
  // Default button attributes
  const [buttonAttrs, setButtonAttrs] = useState<ActionButtonAttributes>({
    href: "",
    text: "Click me",
    display: "inline",
    width: "auto",
    textColor: "#ffffff",
    backgroundColor: "#3b82f6",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#3b82f6",
    borderRadius: "0.25rem",
  });

  const [openNewTab, setOpenNewTab] = useState(false);
  const [activeColorPicker, setActiveColorPicker] = useState<
    "text" | "background" | "border" | null
  >(null);

  // Update a specific attribute
  const updateAttr = (key: keyof ActionButtonAttributes, value: string) => {
    setButtonAttrs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!buttonAttrs.href) {
      alert("Please enter a URL");
      return;
    }

    // Insert the action button with the configured attributes
    editor.commands.setActionButton({
      class: "action-button",
      ...buttonAttrs,
      target: openNewTab ? "_blank" : undefined,
    });
  };

  // Preview of the button
  const previewStyle = {
    color: buttonAttrs.textColor,
    backgroundColor: buttonAttrs.backgroundColor,
    borderStyle: buttonAttrs.borderStyle,
    borderWidth: buttonAttrs.borderWidth,
    borderColor: buttonAttrs.borderColor,
    borderRadius: buttonAttrs.borderRadius,
    width: buttonAttrs.display === "inline" ? buttonAttrs.width : "100%",
    display: "inline-block",
    padding: "0.5rem 1rem",
    textDecoration: "none",
    textAlign: "center" as const,
    fontWeight: 500,
  };

  return (
    <CustomPopover>
      <CustomPopoverTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          title="Insert Action Button"
        >
          <CommandIcon size={16} />
        </Button>
      </CustomPopoverTrigger>
      <CustomPopoverContent className="w-96 p-0">
        <div className="flex justify-between items-center p-3 border-b">
          <h4 className="font-medium">Insert Action Button</h4>
          <CustomPopoverClose>
            <X
              size={16}
              className="cursor-pointer hover:text-muted-foreground"
            />
          </CustomPopoverClose>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={buttonAttrs.text}
                  onChange={(e) => updateAttr("text", e.target.value)}
                  placeholder="Click me"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="button-url">URL</Label>
                <div className="flex items-center space-x-2">
                  <Link2Icon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="button-url"
                    value={buttonAttrs.href}
                    onChange={(e) => updateAttr("href", e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="open-new-tab"
                  checked={openNewTab}
                  onCheckedChange={(checked) => setOpenNewTab(!!checked)}
                />
                <Label htmlFor="open-new-tab" className="text-sm">
                  Open in new tab
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="button-display">Display</Label>
                <Select
                  value={buttonAttrs.display}
                  onValueChange={(value) =>
                    updateAttr("display", value as "inline" | "block")
                  }
                >
                  <SelectTrigger id="button-display">
                    <SelectValue placeholder="Select display mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inline">Inline</SelectItem>
                    <SelectItem value="block">Block</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {buttonAttrs.display === "inline" && (
                <div className="space-y-2">
                  <Label htmlFor="button-width">Width</Label>
                  <Input
                    id="button-width"
                    value={buttonAttrs.width}
                    onChange={(e) => updateAttr("width", e.target.value)}
                    placeholder="auto, 100px, 50%, etc."
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div
                    className="h-10 rounded-md border border-input flex items-center justify-between px-3 cursor-pointer"
                    onClick={() =>
                      setActiveColorPicker(
                        activeColorPicker === "text" ? null : "text"
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: buttonAttrs.textColor }}
                      />
                      <span>{buttonAttrs.textColor}</span>
                    </div>
                  </div>
                  {activeColorPicker === "text" && (
                    <div className="mt-2">
                      <HexColorPicker
                        color={buttonAttrs.textColor}
                        onChange={(color) => updateAttr("textColor", color)}
                      />
                      <HexColorInput
                        color={buttonAttrs.textColor}
                        onChange={(color) => updateAttr("textColor", color)}
                        className="mt-2 w-full border rounded-md px-3 py-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div
                    className="h-10 rounded-md border border-input flex items-center justify-between px-3 cursor-pointer"
                    onClick={() =>
                      setActiveColorPicker(
                        activeColorPicker === "background" ? null : "background"
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: buttonAttrs.backgroundColor }}
                      />
                      <span>{buttonAttrs.backgroundColor}</span>
                    </div>
                  </div>
                  {activeColorPicker === "background" && (
                    <div className="mt-2">
                      <HexColorPicker
                        color={buttonAttrs.backgroundColor}
                        onChange={(color) =>
                          updateAttr("backgroundColor", color)
                        }
                      />
                      <HexColorInput
                        color={buttonAttrs.backgroundColor}
                        onChange={(color) =>
                          updateAttr("backgroundColor", color)
                        }
                        className="mt-2 w-full border rounded-md px-3 py-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Border</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="border-style" className="text-xs">
                      Style
                    </Label>
                    <Select
                      value={buttonAttrs.borderStyle}
                      onValueChange={(value) =>
                        updateAttr("borderStyle", value)
                      }
                    >
                      <SelectTrigger id="border-style">
                        <SelectValue placeholder="Style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="solid">Solid</SelectItem>
                        <SelectItem value="dashed">Dashed</SelectItem>
                        <SelectItem value="dotted">Dotted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="border-width" className="text-xs">
                      Width
                    </Label>
                    <Input
                      id="border-width"
                      value={buttonAttrs.borderWidth}
                      onChange={(e) =>
                        updateAttr("borderWidth", e.target.value)
                      }
                      placeholder="1px"
                    />
                  </div>
                  <div>
                    <Label htmlFor="border-radius" className="text-xs">
                      Radius
                    </Label>
                    <Input
                      id="border-radius"
                      value={buttonAttrs.borderRadius}
                      onChange={(e) =>
                        updateAttr("borderRadius", e.target.value)
                      }
                      placeholder="0.25rem"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Border Color</Label>
                <div
                  className="h-10 rounded-md border border-input flex items-center justify-between px-3 cursor-pointer"
                  onClick={() =>
                    setActiveColorPicker(
                      activeColorPicker === "border" ? null : "border"
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: buttonAttrs.borderColor }}
                    />
                    <span>{buttonAttrs.borderColor}</span>
                  </div>
                </div>
                {activeColorPicker === "border" && (
                  <div className="mt-2">
                    <HexColorPicker
                      color={buttonAttrs.borderColor}
                      onChange={(color) => updateAttr("borderColor", color)}
                    />
                    <HexColorInput
                      color={buttonAttrs.borderColor}
                      onChange={(color) => updateAttr("borderColor", color)}
                      className="mt-2 w-full border rounded-md px-3 py-1"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="py-4">
              <div className="border rounded-md p-4 flex flex-col items-center">
                <h3 className="text-sm font-medium mb-4">Button Preview</h3>
                <div
                  className={buttonAttrs.display === "block" ? "w-full" : ""}
                >
                  <span style={previewStyle}>
                    {buttonAttrs.text || "Click me"}
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-2">
            <Button type="submit">Insert Button</Button>
          </div>
        </form>
      </CustomPopoverContent>
    </CustomPopover>
  );
}
