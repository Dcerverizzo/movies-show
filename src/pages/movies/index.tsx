import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MoviesResponse } from '../../interfaces/index';
import 'tailwindcss/tailwind.css';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';
import dotenv from 'dotenv';

dotenv.config();

interface MoviesProps {
  movies: Movie[];
  totalResults: number;
}

const MoviesPage: React.FC<MoviesProps> = ({ movies, totalResults }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const moviesPerPage = 20;

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredMovies(filtered);
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
    fetchMovies(currentPage);
  }, [currentPage]);


  const fetchMovies = async (newPage: number) => {
    try {
      const { API_LOCAL } = process.env;

      const response = await axios.get<MoviesResponse>(
        `http://localhost:3000/api/movies?page=${newPage}`
      );

      const newMovies = response.data.results;

      setCurrentPage(newPage);
      setFilteredMovies(newMovies);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  const totalPages = Math.ceil(totalResults / moviesPerPage);

  return (
    <div>
      <Layout title="Movie List" page="movies">
        <div className="flex justify-center items-center">
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search movie..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-64"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-10 w-auto">
              {filteredMovies.map((movie) => (
                <div
                  className="card bg-white rounded-lg overflow-hidden shadow-md w-80"
                  key={movie.id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt={`Backdrop de ${movie.title}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                    <p className="text-gray-600">{movie.overview}</p>
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

export const getServerSideProps: GetServerSideProps<MoviesProps> = async (context) => {
  try {
    const { API_LOCAL } = process.env;
    const page = context.query.page || 1;
    const response = await axios.get<MoviesResponse>(
      `${API_LOCAL}/movies?page=${page}`
    );
    const movies = response.data.results;
    const totalResults = response.data.total_results;

    return {
      props: { movies, totalResults },
    };
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return {
      props: { movies: [], totalResults: 0 },
    };
  }
};

export default MoviesPage;
