import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/libs/client";
import type { Blog } from "src/pages/root/index.page";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { q: req.body.q },
  });
  res.status(200).json(data);
};

export default handler;
