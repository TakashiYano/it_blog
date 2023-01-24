import dayjs from "dayjs";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { DetailLayout } from "src/layout";
import { client } from "src/libs/client";
import type { Blog } from "src/pages/root/index.page";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: CustomNextPage<Props> = (props) => {
  return (
    <div className="mx-auto mt-8 min-h-screen max-w-screen-md flex-col">
      <h1 className="text-4xl font-bold">{props.title}</h1>
      <time dateTime={props.publishedAt} className="mt-2 block">
        {dayjs(props.publishedAt).format("YYYY年MM月DD日")}
      </time>
      <article
        className="prose prose-sm mt-8"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const ids = data.contents.map((content) => {
    return `/blog/${content.id}`;
  });
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) {
    return { notFound: true };
  }
  const data = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId: ctx.params.id,
  });

  return {
    props: data,
  };
};

BlogId.getLayout = DetailLayout;

export default BlogId;
