import { Routes } from "@/consts/enum";
import MainHeading from "../main-heading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

async function About() {
  const locale = await getCurrentLocale();
  const { about } = await getTrans(locale);

  return (
    <section className="section-gap" id={Routes.ABOUT}>
      <div className="container text-center">
        <MainHeading subTitle={about.subTitle} title={about.title} />

        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>{about.txt1}</p>

          <p>{about.txt2}</p>

          <p>{about.txt3}</p>
        </div>
      </div>
    </section>
  );
}

export default About;
