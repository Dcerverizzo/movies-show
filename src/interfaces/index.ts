export type User = {
  id: number
  name: string
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  error: string;
}


export interface TvShow {
  id: number;
  overview: string;
  popularity: number; 
  name: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: string;
  origin_country: string;
}

export interface TvShowResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
  error: string;
}



// {
//   "backdrop_path": "/jWXrQstj7p3Wl5MfYWY6IHqRpDb.jpg",
//     "first_air_date": "1952-12-26",
//       "genre_ids": [
//         10763
//       ],
//         "id": 94722,
//           "name": "Tagesschau",
//             "origin_country": [
//               "DE"
//             ],
//               "original_language": "de",
//                 "original_name": "Tagesschau",
//                   "overview": "German daily news program, the oldest still existing program on German television.",
//                     "popularity": 3359.88,
//                       "poster_path": "/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg",
//                         "vote_average": 7.5,
//                           "vote_count": 143
// },