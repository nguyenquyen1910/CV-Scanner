"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, Mail } from "lucide-react";

interface LoginModelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (userData: any) => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModelProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate form
    if (!username || !password) {
      toast({
        title: "Lỗi đăng nhập",
        description: "Vui lòng nhập tên người dùng và mật khẩu",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại!",
          variant: "success",
        });
        const userData = await response.json();
        onClose();
        onLoginSuccess?.(userData.data);
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Sai tên người dùng hoặc mật khẩu",
          variant: "destructive",
        });
        onClose();
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: "Tên người dùng hoặc mật khẩu không chính xác",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-100">Đăng nhập</DialogTitle>
          <DialogDescription className="text-gray-400">
            Đăng nhập để sử dụng đầy đủ tính năng của CV Scanner
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="username"
                type="text"
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:ring-cyan-600 focus:border-cyan-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-gray-300">
                Mật khẩu
              </Label>
              <Button
                variant="link"
                className="px-0 text-sm text-cyan-400 hover:text-cyan-300"
                type="button"
              >
                Quên mật khẩu?
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:ring-cyan-600 focus:border-cyan-600"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:space-x-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-[#696969] hover:text-black font-semibold"
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-700 to-indigo-700 hover:from-cyan-600 hover:to-indigo-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </DialogFooter>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          Chưa có tài khoản?{" "}
          <Button
            variant="link"
            className="p-0 text-cyan-400 hover:text-cyan-300"
            type="button"
          >
            Đăng ký ngay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
