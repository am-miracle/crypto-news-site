import { useState } from 'react';
import {
    Box,
    Center,
    Spinner,
    Image,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue
  } from '@chakra-ui/react';

  import { useGetCryptosNewsQuery } from './services/cryptoNewsApi';

  const demoImage = 'https://images.uhttpsnsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
  
  export default function New({simplified}) {

    const [newsCategory, setNewsCategory] =  useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptosNewsQuery({newsCategory, count: simplified? 6 : 12})
    // const { data } = useGetCryptosQuery(100);
    const color = useColorModeValue('white', 'gray.900')

    console.log(cryptoNews);
    if (!cryptoNews?.value) return <Spinner color='red.500' />;


    return (
      <Center py={6}>
      {cryptoNews?.value.map((news, i)=>(
        <Box
          maxW={'445px'}
          w={'full'}
          bg={color}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
          key={i}>
          <Box
            h={'210px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}>
            <Image src={news?.image?.thumbnail?.contentUrl || demoImage} layout={'fill'} />
          </Box>
          <Stack>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {news.name}
            </Text>
            <Heading
              color={color}
              fontSize={'2xl'}
              fontFamily={'body'}>
              Boost your conversion rate
            </Heading>
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
              <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
        </Box>
        ))}
      </Center>
    );
  }