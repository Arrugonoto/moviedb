import { useState } from 'react';
import { Row, Text, Avatar, Button } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../../data/imageConfig';
import { BsPersonCircle } from 'react-icons/bs';
import format from 'date-fns/format';
import parse from 'html-react-parser';

interface PropTypes {
   author: string;
   avatar_path: string;
   rating: number;
   content: string;
   created_at: string;
   id: string;
   updated_at: string;
}

const Review = ({
   avatar_path,
   author,
   updated_at,
   rating,
   content,
}: PropTypes) => {
   const [showMore, setShowMore] = useState<boolean>(false);

   return (
      <article
         style={{
            background: 'linear-gradient( #9210a04c, transparent 60%)',
            width: '80%',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 0 0.8rem 0 rgba(0, 0, 0, 0.2)',
         }}
      >
         <Row css={{ ai: 'center', gap: '0.7rem', padding: '0.5rem 0' }}>
            {avatar_path ? (
               <Avatar
                  size="lg"
                  src={`${BASE_URL}${IMAGE_SIZE.PROFILE.W185}${avatar_path}`}
                  alt="User profile"
                  zoomed
               />
            ) : (
               <div style={{ padding: '0.1rem' }}>
                  <BsPersonCircle
                     style={{ fontSize: '2.8rem', color: '#9210A0' }}
                  />
               </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <Text h4 size={18} css={{ m: '0' }}>
                  {author}
               </Text>
               <Text size={13} css={{ m: '0' }}>
                  {`Written on ${
                     updated_at && format(new Date(updated_at), 'dd MMM y')
                  }`}
               </Text>
            </div>
            <div
               style={{
                  display: 'flex',
                  placeContent: 'center',
                  backgroundColor: '#9210A0',
                  width: '2.3rem',
                  padding: '0 0.5rem',
                  borderRadius: '.2rem',
               }}
            >
               <Text
                  size={19}
                  css={{
                     fontFamily: 'Roboto',
                     fontWeight: '600',
                     color: '#fafafa',
                  }}
               >
                  {rating}
               </Text>
            </div>
         </Row>
         <Row css={{ fd: 'column', padding: '1rem 0' }}>
            <Text>
               {showMore
                  ? parse(`${content}`)
                  : parse(`${content?.slice(0, 700)}`)}

               {!showMore && content?.length > 700 ? '. . .' : ''}
            </Text>
            <Button
               light
               color="primary"
               onPress={() => setShowMore(prev => !prev)}
               css={{
                  d: 'flex',
                  minWidth: 'auto',
                  p: '0',
                  fontSize: '0.9rem',
                  '&:hover': { textDecoration: 'underline' },
               }}
            >
               {content?.length > 700
                  ? showMore
                     ? 'Show less'
                     : 'Show more'
                  : ''}
            </Button>
         </Row>
      </article>
   );
};

export default Review;
