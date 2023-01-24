import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { CustomNextPage, GetStaticProps } from "next";
import Link from "next/link";
import { FluidLayout } from "src/layout";
import { client } from "src/libs/client";

export type Blog = {
  title: string;
  body: string;
};

type Props = MicroCMSListResponse<Blog>;

const RootPage: CustomNextPage<Props> = (props) => {
  return (
    <div className="mx-auto mt-8 min-h-screen max-w-screen-md flex-col">
      <p className="text-gray-400">{`記事の総数：${props.totalCount}件`}</p>
      <ul className="mt-4 space-y-4">
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`} legacyBehavior>
                <a className="text-xl text-blue-800 underline hover:text-blue-400">
                  {content.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });

  return {
    props: data,
  };
};

RootPage.getLayout = FluidLayout;

export default RootPage;
