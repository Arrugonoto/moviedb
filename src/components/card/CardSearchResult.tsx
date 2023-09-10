import { Container, Row, Image, Text } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import { Link } from 'react-router-dom';
import { BiSolidStar } from 'react-icons/bi';

interface PropTypes {
   result: {
      adult: boolean;
      id: number;
      name?: string;
      original_name?: string;
      media_type: string;
      popularity: number;
      gender?: number;
      known_for_department: string;
      profile_path: string;
      known_for?: {
         adult: boolean;
         backdrop_path: string;
         id: number;
         title: string;
         original_language: string;
         original_title: string;
         name: string;
         original_name: string;
         overview: string;
         poster_path: string;
         media_type: string;
         genre_ids: number[];
         popularity: number;
         release_date: string;
         video: boolean;
         vote_average: number;
         vote_count: number;
      }[];
      backdrop_path: string;
      title?: string;
      original_title?: string;
      original_language: string;
      overview: string;
      poster_path: string;
      genre_ids?: number[];
      release_date?: string;
      video: false;
      vote_average: number;
      vote_count: number;
      first_air_date?: string;
      origin_country?: string[];
   };
}

const CardSearchResult = ({ result }: PropTypes) => {
   return (
      <article
         style={{
            backgroundColor: 'rgba(180,180,180, 0.1)',
            borderRadius: '0.2rem',
            overflow: 'hidden',
         }}
      >
         <Container
            css={{
               d: 'flex',
               fd: 'row',
               m: '0',
               p: '0',
               gap: '1rem',
               flexWrap: 'no-wrap',
            }}
         >
            <div
               style={{ minWidth: '6rem', width: '6rem', cursor: 'pointer' }}
               title={`${result?.name ? result?.name : result?.title}`}
            >
               <Link to={``}>
                  <Image
                     css={{ borderRadius: '0.2rem' }}
                     src={`${BASE_URL}${
                        result?.poster_path
                           ? IMAGE_SIZE.POSTER.W342
                           : IMAGE_SIZE.PROFILE.W632
                     }/${
                        result?.poster_path
                           ? result?.poster_path
                           : result?.profile_path
                     }`}
                     width="100%"
                     loading="lazy"
                     objectFit="cover"
                     alt="Movie Poster"
                  />
               </Link>
            </div>
            <div style={{ padding: '0.5rem 0' }}>
               {result?.media_type && (
                  <Row>
                     <Text
                        css={{
                           fontSize: '0.8rem',
                           textTransform: 'uppercase',
                           color: '#9210a0',
                           fontWeight: '700',
                           letterSpacing: '0.01px',
                        }}
                     >
                        {result?.media_type === 'person'
                           ? 'person'
                           : result?.media_type === 'movie'
                           ? 'movie'
                           : 'tv series'}
                     </Text>
                  </Row>
               )}
               <Row>
                  <Text css={{ fotnFamily: 'Roboto', fontWeight: '600' }}>
                     {result?.name ? result?.name : result?.title}
                  </Text>
               </Row>
               {result?.known_for && (
                  <Row css={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                     {result?.known_for?.map((el, i, arr) => (
                        <Link key={el.id} to={``}>
                           <Text
                              css={{
                                 letterSpacing: '0.01px',
                                 '&:hover': {
                                    color: '#9210A0',
                                 },
                              }}
                           >
                              {el?.name
                                 ? el.name
                                 : el.title +
                                   (arr?.indexOf(el) === arr?.length - 1
                                      ? ''
                                      : ',')}
                           </Text>
                        </Link>
                     ))}
                  </Row>
               )}
               {result.vote_average && (
                  <Row css={{ gap: '0.4rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BiSolidStar
                           style={{ fontSize: '1.1rem', color: '#9210A0' }}
                        />
                        <Text css={{ fontSize: '1rem' }}>
                           {result?.vote_average?.toString()?.slice(0, 3)}
                        </Text>
                     </div>
                     <Text
                        css={{ fontSize: '0.8rem', opacity: '0.7' }}
                        title="Number of votes"
                     >
                        ({result?.vote_count})
                     </Text>
                  </Row>
               )}
               {(result?.release_date || result?.first_air_date) && (
                  <Row>
                     <Text>
                        {result?.release_date
                           ? result?.release_date?.slice(0, 4)
                           : result?.first_air_date?.slice(0, 4)}
                     </Text>
                  </Row>
               )}
            </div>
         </Container>
      </article>
   );
};

export default CardSearchResult;
