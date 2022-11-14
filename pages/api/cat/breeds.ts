import type { NextApiRequest, NextApiResponse } from 'next';
import { Breed } from '../../../types/types';
import { getBreeds } from '../../../services/thecatapi';

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await getBreeds();
  const breedData: Breed[] = await response.json();

  res.status(200).json(breedData);
}
