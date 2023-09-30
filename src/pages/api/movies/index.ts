import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import { MoviesResponse } from '../../../interfaces/index';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse<MoviesResponse>) {
  const { TOKEN, API_URL } = process.env;
  const { page } = req.query;

  try {
    const params = {
      page,
    };

    const response = await axios.get<MoviesResponse>(`${API_URL}/discover/movie`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      },
      params,
    });

    if (response.status === 200) {
      const moviesResponse: MoviesResponse = response.data;
      res.status(200).json(moviesResponse);
    } else {
      res.status(500).json({
        error: 'Erro ao buscar filmes/series',
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
    });
  }
}
