import { useColorMode, Icon, IconButton } from "@chakra-ui/react";

import { FaMoon, FaSun } from "react-icons/fa";
export default function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={<Icon as={isDark ? FaSun : FaMoon} />}
      onClick={toggleColorMode}
      variant="ghost"
      _hover={{
        bg: `${isDark ? "gray.700" : "gray.200"}}`,
      }}
    />
  );
}
