import type { NextApiRequest, NextApiResponse } from "next";
import { Cat } from "../../../../types/types";
import { getCatsByBreedId } from "../../../../services/thecatapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { breed_id } = req.query;
  if (typeof breed_id !== "string") {
    res.status(400).json({ message: "breed id must be provided as a string" });
  }
  const response = await getCatsByBreedId(breed_id as string, 6);
  const catData = (await response.json()) as Cat[];
  // TODO: consider manipulation in the BE to reduce data being sent over the wire

  res.status(200).json(catData);
}
