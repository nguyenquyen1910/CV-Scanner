"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { History, LogOut, Settings, User, ChevronDown } from "lucide-react";

interface UserProfileDropdownProps {
  user: {
    username: string;
    email: string;
  };
  onLogout: () => void;
}

export function UserProfileDropdown({
  user,
  onLogout,
}: UserProfileDropdownProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
      variant: "success",
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-1 px-3 py-2 hover:bg-gray-800 text-gray-300 hover:text-gray-100"
        >
          <User className="h-4 w-4 text-cyan-400 mr-1" />
          <span className="font-medium">{user.username}</span>
          <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-gray-900 border-gray-700 text-gray-200"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-gray-200">
              {user.username}
            </p>
            <p className="text-xs leading-none text-gray-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
            <History className="mr-2 h-4 w-4 text-cyan-400" />
            <span>Lịch sử phân tích</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
            <User className="mr-2 h-4 w-4 text-cyan-400" />
            <span>Thông tin cá nhân</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
            <Settings className="mr-2 h-4 w-4 text-cyan-400" />
            <span>Cài đặt tài khoản</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
