<div align='center'>
   <img width="50%" src="src/assets/logo.svg" alt="movieDB logo"/>
   <h1>movieDB</h1>
   <h3>Another movie database app.</h3>
</div>

<div align='center'>
<img src='https://img.shields.io/github/languages/top/Arrugonoto/moviedb?color=007acc&logo=typescript' alt='Dominant language'/>
<img src='https://img.shields.io/github/license/Arrugonoto/moviedb' alt='License'/>
</div>

<br>
<br>
<br>
<br>

## Getting Started

### Prerequisites

### 1. Create free account at <a href='https://www.themoviedb.org/'>www.themoviedb.org</a>

### 2. Clone repository

```sh
git clone https://github.com/Arrugonoto/moviedb.git
```

### 3. Inside of services directory create a file for API token

```sh
cd src/services

touch api-key.ts
```

### 4. Paste following configuration in newly created file and iclude Your TheMovieDatabase key with token

```sh
export const API_KEY: { key: string, access_token: string } = {
   key: 'TMDB key',
   access_token:
      'TMDB access token',
};
```

#### Note: this file is excluded from git tracking so data contained in it won't be updated to github repository. Never publicly update any of Yours access tokens. Good alternative to store them is to use .env environment variables.

### 5. Install npm dependencies

```sh
npm install
```

### 6. Run development server

```sh
npm run dev
```

### 7. Open app in browser and enjoy testing.
