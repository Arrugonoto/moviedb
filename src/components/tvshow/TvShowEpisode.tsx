import { Row, Text, Image, useTheme } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import { BiSolidStar } from 'react-icons/bi';

interface PropTypes {
   episode: {
      air_date: string;
      episode_number: number;
      episode_type: string;
      id: number;
      name: string;
      overview: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string;
      vote_average: number;
      vote_count: number;
   };
}

const TvShowEpisode = ({ episode }: PropTypes) => {
   const { isDark } = useTheme();

   return (
      <article
         style={{
            display: 'flex',
            width: '100%',
            gap: '0.3rem',
         }}
      >
         <div style={{ width: '20rem' }}>
            <Image
               src={`${BASE_URL}${IMAGE_SIZE.STILL.W300}/${episode?.still_path}`}
               alt="Tv Show episode poster"
               objectFit="cover"
               width="100%"
               loading="lazy"
               css={{ borderRadius: '0.2rem' }}
            />
         </div>
         <div
            style={{
               width: '100%',
               padding: '0 1rem 1rem 1rem',
               backgroundColor: isDark
                  ? 'rgba(220, 220, 220, 0.1)'
                  : 'rgba(220, 220, 220, 0.5)',
            }}
         >
            <Row css={{ gap: '0.5rem' }}>
               <Text size={18} css={{ fontWeight: '600' }}>
                  {`ep${episode?.episode_number > 9 ? '' : '0'}${
                     episode?.episode_number
                  }`}
                  :
               </Text>
               <Text
                  size={18}
                  css={{
                     fontWeight: '600',
                     transition: 'color .2s linear',
                     '&:hover': {
                        color: '#9210A0',
                     },
                  }}
               >
                  {episode?.name}
               </Text>
            </Row>
            <Row css={{ ai: 'center' }}>
               <BiSolidStar style={{ fontSize: '1.2rem', color: '#9210A0' }} />
               <Text title="Average score" css={{ fontSize: '1rem' }}>
                  {episode?.vote_average}
                  <span title="Number of votes">{` (${episode?.vote_count})`}</span>
               </Text>
            </Row>
            <Row>
               <Text>{episode?.overview}</Text>
            </Row>
         </div>
      </article>
   );
};

export default TvShowEpisode;
