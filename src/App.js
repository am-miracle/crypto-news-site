import React from 'react';
import {
    Box,
    Grid,
    Link,
    Spinner,
    Image,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Flex,
    Heading,
    Input,
    Spacer
  } from '@chakra-ui/react';
  import { ColorModeScript } from '@chakra-ui/react';


  import { useGetCryptosNewsQuery } from './services/cryptoNewsApi';

  const demoImage = 'https://images.uhttpsnsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  

function App() {

  const newsCategory ='Cryptocurrency';
  const { data: cryptoNews } = useGetCryptosNewsQuery({newsCategory})
  const color = useColorModeValue('white', 'gray.900');

  console.log(cryptoNews);
  if (!cryptoNews?.value) return <Spinner  />;

  return (
    <Box px={'6'} py={'16'}>
      <Flex pb={'6'}>
        <Heading>CryptoNewsSite</Heading>
        <Spacer />
        <Input htmlSize={20} width='auto' placeholder='Search for Crypto' />
        <ColorModeScript />
      </Flex>
      <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={6}>
        {cryptoNews?.value.map((news, i)=>(
            <Box
            w={'full'}
            bg={color}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
            key={i}>
              <Box
              h={'250px'}
              bg={'gray.100'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}>
              <Image 
              src={news?.image?.thumbnail?.contentUrl || demoImage} 
              layout={'fill'}
              w={'full'}
              h={'full'}
               />
              </Box>
              <Stack>
                <Link
                  href={news.url} target='_blank' rel='noreferrer'
                  color={'green.500'}
                  textTransform={'uppercase'}
                  fontWeight={800}
                  fontSize={'sm'}
                  letterSpacing={1.1}>
                  {news.name}
                </Link>
                <Text color={'gray.500'}>
                  {news.description > 100 ? `${news.description.subString(0, 100)}...` : news.description}
                </Text>
              </Stack>
              <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                  src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                  alt={'Author'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                  <Text fontWeight={600}>{news.provider[0]?.name}</Text>
                  <Text color={'gray.500'}>{new Date(news.datePublished).toLocaleDateString(undefined, {  
                      day:   'numeric',
                      month: 'short',
                      year:  'numeric',
                  })}</Text>
                </Stack>
              </Stack>
            </Box>
        ))}
      </Grid>

    </Box>
  );
}

export default App;