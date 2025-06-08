import MainHeading from "@/components/main-heading";
import { Routes } from "@/consts/enum";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Contact = async () => {
  const locale = await getCurrentLocale();
  const { contact } = await getTrans(locale);

  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading subTitle={contact.subTitle} title={contact.title} />

        <div className="mt-8">
          <a className="text-4xl underline text-accent" href="tel:+2012121212">
            +2012121212
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
