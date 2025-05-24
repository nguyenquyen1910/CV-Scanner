"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Download, ExternalLink } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-config";

interface CvViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvId: number;
  cvName?: string;
}

export function CvViewerModal({
  isOpen,
  onClose,
  cvId,
  cvName = "CV",
}: CvViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const cvUrl = `${API_BASE_URL}/view-cv/${cvId}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] bg-gray-900 border-gray-700 p-0">
        <DialogHeader className="p-4 border-b border-gray-800">
          <DialogTitle className="text-gray-100 flex items-center justify-between">
            <span>{cvName}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                onClick={() => window.open(cvUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Mở trong tab mới
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                onClick={() => window.open(cvUrl, "_blank")}
              >
                <Download className="h-4 w-4 mr-1" />
                Tải xuống
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[70vh] overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
              <span className="ml-2 text-gray-300">Đang tải CV...</span>
            </div>
          )}

          <iframe
            src={cvUrl}
            className="w-full h-full border-0"
            onLoad={handleLoad}
            onError={handleError}
            title="CV Viewer"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
