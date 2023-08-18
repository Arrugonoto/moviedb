import { Container, Row, Col, Text, Image, useTheme } from '@nextui-org/react';
import { format } from 'date-fns';
import { BiSolidStar } from 'react-icons/bi';

interface TvShowDetailsProps {
   backdropPath: string;
   seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
   }[];
   firstAirDate: string;
   name: string;
   voteAverage: number;
   voteCount: number;
   tagline: string;
}

const DetailsHeader = ({
   backdropPath,
   seasons,
   firstAirDate,
   name,
   voteAverage,
   voteCount,
   tagline,
}: TvShowDetailsProps) => {
   const { isDark } = useTheme();
   const posterPath: string = seasons[seasons.length - 1]?.poster_path;

   return (
      <Container
         css={{
            position: 'relative',
            h: '30rem',
            background: `url("https://image.tmdb.org/t/p/w1280${backdropPath}") no-repeat`,
            backgroundSize: 'cover',
            '&:after': {
               content: '',
               position: 'absolute',
               left: 0,
               top: 0,
               w: '100%',
               h: '100%',
               background:
                  'linear-gradient(0deg, rgba(2, 7, 4, 1), rgba(146, 16, 160, 0.5))',
               opacity: 1,
               backdropFilter: 'blur(0.5px)',
               transition: 'opacity 0.2s linear, backdrop-filter 0.2s linear',
            },
            '&:hover:after': {
               opacity: 0.8,
               backdropFilter: 'blur(0)',
            },
         }}
      >
         <Col
            css={{
               w: '18rem',
               position: 'absolute',
               zIndex: 10,
               left: '50%',
               translate: '-50% 24%',
               bottom: '0',
            }}
         >
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 0 .5rem 0',
               }}
            >
               <BiSolidStar style={{ fontSize: '2.3rem', color: '#FFCA28' }} />
               <Col span={3}>
                  <Row
                     css={{
                        d: 'flex',
                        fd: 'column',
                     }}
                  >
                     <Text
                        size={22}
                        css={{
                           fontWeight: '600',
                           fontFamily: 'Roboto',
                           color: '#fafafa',
                        }}
                        title="Rating"
                     >
                        {voteAverage?.toFixed(1)}
                     </Text>
                     <Text
                        size={12}
                        css={{
                           fontFamily: 'Roboto',
                           color: 'rgb(202, 202, 202)',
                           letterSpacing: '0.1px',
                           lineHeight: '1px',
                        }}
                        title="Votes"
                     >
                        {voteCount}
                     </Text>
                  </Row>
               </Col>
            </div>
            <div
               style={{
                  boxShadow: '0 0 1rem 0 #000',
                  borderRadius: '0.2rem',
                  overflow: 'hidden',
                  width: '20rem',
               }}
            >
               <Image
                  src={`https://image.tmdb.org/t/p/w780${posterPath}`}
                  loading="lazy"
                  objectFit="cover"
                  alt="Movie Poster"
               />
            </div>
            <Text
               size={22}
               css={{
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  fontWeight: '600',
                  letterSpacing: '0.3px',
               }}
            >
               {name}
            </Text>
            <Row css={{ placeContent: 'center' }}>
               <Text
                  size={15}
                  css={{
                     color: `${
                        isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                     }`,
                     letterSpacing: '0.05px',
                  }}
               >
                  {firstAirDate && format(new Date(firstAirDate), 'yyyy')}
               </Text>
            </Row>
            <Row css={{ placeContent: 'center' }}>
               <Text
                  size={16}
                  css={{
                     fontFamily: 'Roboto',
                     fontStyle: 'italic',
                     color: '#9210A0',
                     opacity: 0.7,
                     transition: 'opacity 0.2s linear',
                     '&:hover': {
                        opacity: 1,
                     },
                  }}
               >
                  {tagline}
               </Text>
            </Row>
         </Col>
      </Container>
   );
};

export default DetailsHeader;
