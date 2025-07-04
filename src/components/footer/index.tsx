import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Footer = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  return (
    <footer className="border-t p-8 text-center text-accent">
      <div className="container">
        <p>{translations.footer}</p>
      </div>
    </footer>
  );
};

export default Footer;
