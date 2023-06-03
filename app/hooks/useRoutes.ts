import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BiMessageSquareDetail, BiUser, BiLogOut } from "react-icons/bi";
import { MdOutlineSmartToy } from "react-icons/md";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: BiMessageSquareDetail,
        active: pathname === "/conversation" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: BiUser,
        active: pathname === "/users",
      },
      {
        label: "Smart Chat",
        href: "/ai",
        icon: MdOutlineSmartToy,
        active: pathname === "/ai",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: BiLogOut,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
