import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { CustomNextPage, GetStaticProps } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useState } from "react";
import { FluidLayout } from "src/layout";
import { client } from "src/libs/client";

export type Blog = {
  title: string;
  body: string;
};

type Props = MicroCMSListResponse<Blog>;

const RootPage: CustomNextPage<Props> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();

  const onHandleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = () => {
    setSearch(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
    <div className="mx-auto mt-8 min-h-screen max-w-screen-md flex-col">
      <form className="flex gap-x-2" onSubmit={onHandleSubmit}>
        <input type="text" name="query" className="border border-black px-2" />
        <button className="border border-black px-2">検索</button>
        <button
          type="reset"
          className="border border-black px-2"
          onClick={handleClick}
        >
          リセット
        </button>
      </form>

      <p className="mt-4 text-gray-400">
        {`${search ? "検索結果" : "記事の総数"}：${totalCount}件`}
      </p>

      <ul className="mt-4 space-y-4">
        {contents.map((content) => {
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
