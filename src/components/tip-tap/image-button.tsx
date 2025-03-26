"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  CustomPopover,
  CustomPopoverClose,
  CustomPopoverContent,
  CustomPopoverTrigger,
} from "@/components/ui/custom-popover";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Editor } from "@tiptap/react";
import { ImageIcon, Link2Icon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface ImageButtonProps {
  editor: Editor;
}

export function ImageButton({ editor }: ImageButtonProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // You might get these from props or context
  const userId = "user123";
  const productId = "product456";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    handleFile(files[0]);
  };

  const handleFile = (file: File) => {
    setIsUploading(true);

    // Generate a unique name for the file
    const uniqueFileName = `${userId}-${productId}-${Date.now()}-${file.name}`;

    // Create a temporary blob URL
    const tempUrl = URL.createObjectURL(file);

    // Store file metadata for later upload
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    };

    // Insert the image node with the blob URL and mark it as a local file
    editor
      .chain()
      .focus()
      .setCustomImage({
        src: tempUrl,
        alt: uniqueFileName,
        title: uniqueFileName,
        isLocalFile: true,
        fileData: fileData,
      })
      .run();

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsUploading(false);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) return;

    // Insert the image with the provided URL (not a local file)
    editor
      .chain()
      .focus()
      .setCustomImage({
        src: imageUrl,
        alt: "Image",
        isLocalFile: false,
      })
      .run();

    // Reset the URL input
    setImageUrl("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    // Check if the file is an image
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please drop an image file");
      return;
    }

    handleFile(file);
  };

  return (
    <CustomPopover>
      <CustomPopoverTrigger>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ImageIcon size={16} />
        </Button>
      </CustomPopoverTrigger>
      <CustomPopoverContent className="w-80 p-0">
        <div className="flex justify-between items-center p-3 border-b">
          <h4 className="font-medium">Insert Image</h4>
          <CustomPopoverClose>
            <X
              size={16}
              className="cursor-pointer hover:text-muted-foreground"
            />
          </CustomPopoverClose>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="p-4 space-y-4">
            <div
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                {isDragging
                  ? "Drop image here"
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">
                SVG, PNG, JPG or GIF (max. 2MB)
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Select Image"}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Images will be stored temporarily and only uploaded when you
              submit the form.
            </p>
          </TabsContent>

          <TabsContent value="url" className="p-4 space-y-4">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="image-url" className="text-sm font-medium">
                  Image URL
                </label>
                <div className="flex items-center space-x-2">
                  <Link2Icon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={!imageUrl}>
                Insert Image
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CustomPopoverContent>
    </CustomPopover>
  );
}
