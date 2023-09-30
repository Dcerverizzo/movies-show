import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TvShow, TvShowResponse } from '../../interfaces/index';
import 'tailwindcss/tailwind.css';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';
import dotenv from 'dotenv';
import StarRating from '../../components/StarRating';

dotenv.config();

interface TvShowProps {
  tvShows: TvShow[];
  totalResults: number;
}

const TvShowPage: React.FC<TvShowProps> = ({ tvShows: initialTvShows, totalResults }) => {
  const [tvShows, setTvShows] = useState(initialTvShows);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const tvShowsPerPage = 20;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const { query } = router;
    const page = query.page ? parseInt(query.page as string) : 1;
    setCurrentPage(page);
  }, [router.query]);

  useEffect(() => {
    fetchTvShows(currentPage);
  }, [currentPage]);

  const fetchTvShows = async (newPage: number) => {
    try {
      const { API_LOCAL } = process.env;

      const response = await axios.get<TvShowResponse>(
        `http://localhost:3000/api/tv-show?page=${newPage}`
      );

      const newTvShows = response.data.results;

      const filtered = searchQuery
        ? newTvShows.filter((tvShow) =>
          tvShow.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : newTvShows;

      setTvShows(filtered);
    } catch (error) {
      console.error('Erro ao buscar programas de TV1:', error);
    }
  };

  const totalPages = Math.ceil(totalResults / tvShowsPerPage);

  return (
    <div>
      <Layout title="Programas de TV" page="TvShow">
        <div className="flex justify-center items-center">
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Pesquisar programas de TV..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-64"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-10 w-auto">
              {tvShows.map((tvShow) => (
                <div
                  className="card bg-white rounded-lg overflow-hidden shadow-md w-80"
                  key={tvShow.id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${tvShow.backdrop_path}`}
                    alt={`Backdrop de ${tvShow.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                  <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{tvShow.name}
                      <img
                          alt={tvShow.origin_country}
                          className="w-8 h-8" src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${tvShow.origin_country}.svg`} />
                    </h2>
                      <p className="text-gray-600">{tvShow.popularity}</p>
                      <div className='text-right'><StarRating rating={tvShow.vote_average} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                const pageQuery = newPage > 1 ? { page: newPage } : {};
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, ...pageQuery },
                });
              }}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TvShowProps> = async (context) => {
  try {
    const { API_LOCAL } = process.env;
    const page = context.query.page || 1;
    const response = await axios.get<TvShowResponse>(`http://localhost:3000/api/tv-show?page=${page}`);
    const tvShows = response.data.results;
    const totalResults = response.data.total_results;

    return {
      props: { tvShows, totalResults },
    };
  } catch (error) {
    console.error('Erro ao buscar programas de TV:', error);
    return {
      props: { tvShows: [], totalResults: 0 },
    };
  }
};

export default TvShowPage;
