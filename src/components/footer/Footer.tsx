import { Container } from '@nextui-org/react';

const Footer = () => {
   return (
      <footer style={{ width: '100%', marginTop: '3rem' }}>
         <section style={{ width: '100%' }}>
            <Container
               fluid
               css={{
                  d: 'flex',
                  jc: 'center',
                  bc: '$violet500',
                  p: '3rem 0',
                  color: '#fafafa',
                  maxWidth: '100%',
               }}
            >
               I am a footer
            </Container>
         </section>
      </footer>
   );
};

export default Footer;
