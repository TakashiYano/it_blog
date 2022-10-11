import type { CustomNextPage } from "next";
import { FluidLayout } from "src/layout";

const RootPage: CustomNextPage = () => {
  return <h2>Root!</h2>;
};

RootPage.getLayout = FluidLayout;

export default RootPage;
