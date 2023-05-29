import { NextApiRequest, NextApiResponse } from "next";

export default async function clipsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  let result;

  switch (method) {
    case "GET":
      try {
        console.log("fetching");
        const result = await fetch(
          "https://assets.dev.verse-core.vrse.gg/frontend-interview/data.json"
        );
        console.log();
        res.status(200).json(result.data);
      } catch (error: any) {
        res.status(error.response.status).send(error.response.data);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
