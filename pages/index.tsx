import {
  ABOUT_1,
  ABOUT_2,
  CONTACT,
  FAQ,
  FOOTER,
  NAVIGATION,
  SPONSORS,
  STATS,
  STORIES
} from "../constants";
import { Anchor, Footer, Navbar, Spacer, Stats, Tilted } from "../components";
import { Faq, Hero, MailingList, Section, Stories } from "../sections";

const Index = () => {
  return (
    <>
      <Navbar {...NAVIGATION} />
      <Hero />
      <Tilted>
        <Anchor i="about" />
        <Section {...ABOUT_1} />
        <Stats {...STATS} />
        <Section {...ABOUT_2} />
        <Spacer sz={14} />
        <Stories {...STORIES} />
        <Spacer sz={14} />
        <Anchor i="faq" />
        <Faq {...FAQ} />
        <Spacer sz={4} />
        <Anchor i="sponsors" />
        <Section {...SPONSORS} />
        <Anchor i="contact" />
        <Spacer sz={14} />
        <Section {...CONTACT} />
      </Tilted>
      <Footer {...FOOTER} />
    </>
  );
};

export default Index;
