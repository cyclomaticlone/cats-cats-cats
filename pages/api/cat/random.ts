import type { NextApiRequest, NextApiResponse } from "next";
import { Cat } from "../../../types/types";
import { getRandomCat } from "../../../services/thecatapi";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await getRandomCat();
  const catData = (await response.json()) as Cat[];

  res.status(200).json(catData[0]);
}
