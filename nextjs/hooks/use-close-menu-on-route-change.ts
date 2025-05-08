import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function useCloseMenuOnRouteChange(setOpenMenu: (v: boolean) => void) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setOpenMenu(false);
      previousPath.current = pathname;
    }
  }, [pathname, setOpenMenu]);
}
