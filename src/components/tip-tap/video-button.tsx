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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Editor } from "@tiptap/react";
import { Link2Icon, Upload, VideoIcon, X } from "lucide-react";
import { useRef, useState } from "react";

interface VideoButtonProps {
  editor: Editor;
}

export function VideoButton({ editor }: VideoButtonProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
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

    // Insert the video node with the blob URL and mark it as a local file
    editor
      .chain()
      .focus()
      .setVideo({
        src: tempUrl,
        title: uniqueFileName,
        controls,
        autoplay,
        loop,
        muted,
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

    if (!videoUrl) return;

    // Insert the video with the provided URL (not a local file)
    editor
      .chain()
      .focus()
      .setVideo({
        src: videoUrl,
        title: "Video",
        controls,
        autoplay,
        loop,
        muted,
        isLocalFile: false,
      })
      .run();

    // Reset the URL input
    setVideoUrl("");
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

    // Check if the file is a video
    const file = files[0];
    if (!file.type.startsWith("video/")) {
      alert("Please drop a video file");
      return;
    }

    handleFile(file);
  };

  return (
    <CustomPopover>
      <CustomPopoverTrigger>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <VideoIcon size={16} />
        </Button>
      </CustomPopoverTrigger>
      <CustomPopoverContent className="w-80 p-0">
        <div className="flex justify-between items-center p-3 border-b">
          <h4 className="font-medium">Insert Video</h4>
          <CustomPopoverClose>
            <X
              size={16}
              className="cursor-pointer hover:text-muted-foreground"
            />
          </CustomPopoverClose>
        </div>

        <Tabs defaultValue="url" className="w-full">
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
                  ? "Drop video here"
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">
                MP4, WebM, or OGG (max. 100MB)
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Select Video"}
            </Button>

            <p className="text-xs text-muted-foreground mt-1">
              Videos will be stored temporarily and only uploaded when you
              submit the form.
            </p>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full text-xs"
              >
                {showAdvanced
                  ? "Hide Advanced Options"
                  : "Show Advanced Options"}
              </Button>

              {showAdvanced && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="controls"
                      checked={controls}
                      onCheckedChange={(checked) =>
                        setControls(checked as boolean)
                      }
                    />
                    <Label htmlFor="controls" className="text-sm">
                      Show controls
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoplay"
                      checked={autoplay}
                      onCheckedChange={(checked) =>
                        setAutoplay(checked as boolean)
                      }
                    />
                    <Label htmlFor="autoplay" className="text-sm">
                      Autoplay
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="loop"
                      checked={loop}
                      onCheckedChange={(checked) => setLoop(checked as boolean)}
                    />
                    <Label htmlFor="loop" className="text-sm">
                      Loop
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="muted"
                      checked={muted}
                      onCheckedChange={(checked) =>
                        setMuted(checked as boolean)
                      }
                    />
                    <Label htmlFor="muted" className="text-sm">
                      Muted
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="p-4 space-y-4">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="video-url" className="text-sm font-medium">
                  Video URL
                </label>
                <div className="flex items-center space-x-2">
                  <Link2Icon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="video-url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports YouTube, Vimeo, or direct video file URLs
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full text-xs"
                >
                  {showAdvanced
                    ? "Hide Advanced Options"
                    : "Show Advanced Options"}
                </Button>

                {showAdvanced && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="controls-url"
                        checked={controls}
                        onCheckedChange={(checked) =>
                          setControls(checked as boolean)
                        }
                      />
                      <Label htmlFor="controls-url" className="text-sm">
                        Show controls
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoplay-url"
                        checked={autoplay}
                        onCheckedChange={(checked) =>
                          setAutoplay(checked as boolean)
                        }
                      />
                      <Label htmlFor="autoplay-url" className="text-sm">
                        Autoplay
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="loop-url"
                        checked={loop}
                        onCheckedChange={(checked) =>
                          setLoop(checked as boolean)
                        }
                      />
                      <Label htmlFor="loop-url" className="text-sm">
                        Loop
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="muted-url"
                        checked={muted}
                        onCheckedChange={(checked) =>
                          setMuted(checked as boolean)
                        }
                      />
                      <Label htmlFor="muted-url" className="text-sm">
                        Muted
                      </Label>
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={!videoUrl}>
                Insert Video
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CustomPopoverContent>
    </CustomPopover>
  );
}
