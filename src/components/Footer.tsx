import { Flex, HStack} from "@chakra-ui/react";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Footer() {
  const socialsStyle = `
    text-green-500
    hover:text-green-400
    transition
    duration-200
    ease-in-out
    
  `;
  return (
    <Flex as="footer" align="center" 
     p = "4"
    justify="center" w="100%" h="100px">
      <HStack spacing="24px">
        <FaGithub size={30} className={socialsStyle} />
        <FaLinkedin size={30} className={socialsStyle} />
        <FaTwitter size={30} className={socialsStyle} />
      </HStack>
    </Flex>
  );
}
