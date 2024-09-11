import { usePathname } from "next/navigation";
import { locales } from "~/i18n/config";

export const useCustomPathname = () => {
  const originPathname = usePathname();
  
    let pathname = originPathname;
    const lang = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  
    if (lang && pathname.startsWith(`/${lang}`)) {
      pathname = pathname.replace(`/${lang}`, '');
    }
  
    if (!pathname.startsWith('/')) {
      pathname = '/' + pathname;
    }
    return pathname;
  };