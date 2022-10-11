import type { CustomNextPage } from "next";
import { FixedLayout } from "src/layout";

const AboutPage: CustomNextPage = () => {
  return <h2>About!</h2>;
};

AboutPage.getLayout = FixedLayout;

export default AboutPage;
