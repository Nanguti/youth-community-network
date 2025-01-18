import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Community Forums</h1>
          <Link
            href="/forum/create"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <Button className="bg-pink-600 hover:bg-pink-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
