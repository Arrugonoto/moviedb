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

## Features

Yup at least two:

-  **Browse data** about movie, tv shows and people related to movie industry
-  **Check Top 100** movies or tv shows
-  **Discover** upcoming movie releases
-  **Search** about movies, series or people that interest you

Or maybe just look what's currently trending.

## Tech Stack

<div align='center' style='display: flex; justify-content: center; gap: 20px;'>
<div>
<img width='50px' src='https://camo.githubusercontent.com/61e102d7c605ff91efedb9d7e47c1c4a07cef59d3e1da202fd74f4772122ca4e/68747470733a2f2f766974656a732e6465762f6c6f676f2e737667' alt='Vite logo' />

`Vite`

</div>
<div>
<img width='56px' src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' alt='React logo' />

`React`

</div>
<div>
<img width='50px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png' alt='TypeScript logo' />

`TypeScript`

</div>
<div>
<img width='70px' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg' alt='TMDB logo' style='object-fit: cover;' />

`TMDB`

</div>
<div>
<img width='50px' src='https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png' alt='NextUI logo' />

`NextUI`

</div>
<div>
<img width='50px' src='https://camo.githubusercontent.com/179d66ab2b0321726c88a586c4ad38802e7113a3c98c6fd3f0156c01c98cfd14/68747470733a2f2f6672616d657275736572636f6e74656e742e636f6d2f696d616765732f34386861395a52396f5a51475136675a38595566456c50335430412e706e67' alt='Framer Motion logo' />

`Framer Motion`

</div>
</div>

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
