import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Button } from "./ui/button";
import { History } from "lucide-react";
import { Separator } from "./ui/separator";

export const Header = () => {
  return (
    <header className="h-16 border-b flex items-center justify-between px-8">
      {/* BRAND */}
      <Link to="/home" className="text-2xl font-bold hover:cursor-pointer">
        Aozora Ecomerce
      </Link>

      {/* SEARCH BAR */}
      <Input className="max-w-[600px]" placeholder="Search productst.." />

      {/* BUTTONS */}
      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button variant="ghost">
              <IoCart className="!h-6 !w-6 mr-2" />
              <span className="text-lg font-bold">2</span>
            </Button>
          </Link>

          <Link to="/history">
            <Button size="icon" variant="ghost">
              <History className="!h-6 !w-6" />
            </Button>
          </Link>

          <Link to="/wishlist">
            <Button size="icon" variant="ghost">
              <IoHeart className="!h-6 !w-6" />
            </Button>
          </Link>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2 items-center">
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
