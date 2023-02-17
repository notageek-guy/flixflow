import { useAuth } from "@/context/AuthContext";
import { IconButton } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
export default function Logout() {
  const { handleLogout } = useAuth();
  return (
    <IconButton
      aria-label="Logout"
      icon={<FaSignOutAlt size={20} className="text-green-400" />}
      onClick={handleLogout}
      variant="ghost"
    />
  );
}
