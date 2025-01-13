import React from "react";
import {
  MessageCircle,
  Users,
  Award,
  Globe,
  TrendingUp,
  ChevronRight,
  Star,
  ArrowRight,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Footer = () => {
  return (
    <div>
      {" "}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Youth Platform</h3>
              <p className="text-gray-400">
                Empowering young voices to create positive change globally.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="text-gray-400 hover:text-white p-0"
                  >
                    About Us
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-400 hover:text-white p-0"
                  >
                    Community Guidelines
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-400 hover:text-white p-0"
                  >
                    Success Stories
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="text-gray-400 hover:text-white p-0"
                  >
                    Help Center
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-400 hover:text-white p-0"
                  >
                    Events Calendar
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-400 hover:text-white p-0"
                  >
                    Blog
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Youth Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
