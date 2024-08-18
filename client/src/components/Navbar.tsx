import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { logOut } = useAuthContext();
  return (
    <header className="flex justify-between items-center   mx-10 mb-10">
      <div>
        <Link to="/" className="text-3xl font-extrabold ">
          Todo App
        </Link>
      </div>
      <div className="flex gap-x-5 items-center">
        <ThemeToggle />
        <button
          onClick={logOut}
          className=" rounded-md  font-semibold text-xs "
        >
          Çıkış
        </button>
      </div>
    </header>
  );
}
