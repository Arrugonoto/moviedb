type Methods = {
   GET: string;
   POST: string;
   PATCH: string;
   DELETE: string;
};

interface ApiEndpoints {
   GENRE: string;
}

export const METHODS: Methods = {
   GET: 'GET',
   POST: 'POST',
   PATCH: 'PATCH',
   DELETE: 'DELETE',
};

export const API_ENDPOINT: ApiEndpoints = {
   GENRE: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US',
};
