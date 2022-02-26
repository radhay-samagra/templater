import React, { ReactElement, ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  Image,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Wrap,
  Center,
  StackDivider,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiUser,
  FiSettings,
  FiActivity,
  FiCode,
  FiMenu,
  FiBell,
  FiBookOpen,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: ReactElement;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: <FiHome />, route: "/home" },
  { name: "Transformer", icon: <FiActivity />, route: "/transformer" },
  { name: "Lambda", icon: <FiCode />, route: "/lambda" },
  { name: "Account", icon: <FiUser />, route: "account" },
  { name: "Settings", icon: <FiSettings />, route: "settings" },
  { name: "Docs", icon: <FiBookOpen />, route: "docs" },
];

interface Flavor {
  name: string;
}

const Flavors: Array<Flavor> = [
  { name: "JSTL" },
  { name: "JINJA" },
  { name: "EJS" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="12" alignItems="center" mx="8" justifyContent="space-between">
        <HStack>
          <Box boxSize="m">
            <Image m="1" src="./logo.png" />
          </Box>
          <Spacer />
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Templater
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </HStack>
      </Flex>
      <HStack h="full" w="full" bg="green.100">
        <VStack w="5vh" h="full" bg="tomato" spacing={2}>
          {LinkItems.map((link) => (
            <Link
              as={RouterLink}
              to={link.route}
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
            >
              <IconButton
                isRound={true}
                size="sm"
                aria-label={`${link.name}`}
                _groupHover={{
                  color: "white",
                }}
                icon={link.icon}
              />
            </Link>
          ))}
        </VStack>
        <VStack w="full" h="full" bg="red.100" spacing={4}>
          <Box w="full" textAlign={["left"]}>
            <Heading as="h4" size="sm" isTruncated>
              FLAVOR
            </Heading>
            {Flavors.map((flavor) => (
              <Text>{flavor.name}</Text>
            ))}
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="12"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
