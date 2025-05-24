"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileSearch, Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginModal } from "@/components/login-modal";
import { UserProfileDropdown } from "@/components/user-profile-dropdown";
import { ScrollLink } from "@/components/scroll-link";

// Giả lập trạng thái đăng nhập
type UserType = {
  username: string;
  email: string;
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleLoginSuccess = (event: CustomEvent) => {
      const userData = event.detail;
      setUser(userData.data);
      localStorage.setItem("user", JSON.stringify(userData.data));
    };

    const handleScroll = () => {
      const sections = ["home", "features", "scanner", "tech"];
      const scrollPosition = window.scrollY + 100; // Thêm offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("login-success" as any, handleLoginSuccess);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("login-success" as any, handleLoginSuccess);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleLoginSuccess = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setLoginModalOpen(false);
  };

  const getNavLinkClass = (section: string) => {
    return `text-gray-400 hover:text-gray-100 font-medium transition-colors duration-200 ${
      activeSection === section ? "text-cyan-400" : ""
    }`;
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <ScrollLink href="#home" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-cyan-700 to-indigo-700 rounded-lg p-2">
              <FileSearch className="h-6 w-6 text-gray-100" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              CV Scanner
            </span>
          </ScrollLink>

          <nav className="hidden md:flex items-center space-x-8">
            <ScrollLink href="#home" className={getNavLinkClass("home")}>
              Trang chủ
            </ScrollLink>
            <ScrollLink
              href="#features"
              className={getNavLinkClass("features")}
            >
              Tính năng
            </ScrollLink>
            <ScrollLink href="#scanner" className={getNavLinkClass("scanner")}>
              Phân tích CV
            </ScrollLink>
            <ScrollLink href="#tech" className={getNavLinkClass("tech")}>
              Công nghệ
            </ScrollLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Button
                variant="default"
                className="font-medium bg-gradient-to-r from-cyan-700 to-indigo-700 text-white hover:from-cyan-600 hover:to-indigo-600"
                onClick={() => setLoginModalOpen(true)}
              >
                Đăng nhập
              </Button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-400" />
            ) : (
              <Menu className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <ScrollLink
                href="#home"
                className={`${getNavLinkClass("home")} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </ScrollLink>
              <ScrollLink
                href="#features"
                className={`${getNavLinkClass("features")} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tính năng
              </ScrollLink>
              <ScrollLink
                href="#scanner"
                className={`${getNavLinkClass("scanner")} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Phân tích CV
              </ScrollLink>
              <ScrollLink
                href="#tech"
                className={`${getNavLinkClass("tech")} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Công nghệ
              </ScrollLink>
              <div className="pt-2">
                {user ? (
                  <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-cyan-400" />
                      <span className="text-gray-200">{user.username}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-gray-700 p-2 h-8"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginModalOpen(true);
                    }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}
