import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import { TvShowResponse } from '../../../interfaces/index';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse<TvShowResponse>) {
  const { TOKEN, API_URL } = process.env;
  const { page } = req.query;

  try {
    const params = {
      page
    };
   
    const response = await axios.get<TvShowResponse>(`${API_URL}/discover/tv`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        },
        params
      });

      if (response.status === 200) {
        const tvShowResponse: TvShowResponse = response.data;
        res.status(200).json(tvShowResponse);
      } else {
        res.status(500).json({ error: 'Erro ao buscar filmes/series' });
      }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
