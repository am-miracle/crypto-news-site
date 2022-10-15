
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeader =  {
  "Accept": "application/vnd.api+json",
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': '129b2fc319msh341b23a0412e0abp1dab02jsn64e71a25960c',
  'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_KE
}

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://bing-news-search1.p.rapidapi.com'}),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: (newsCategory) => ({
        url: `/news/search?q=${newsCategory}`,
        method: 'GET',
        headers: cryptoNewsHeader
      }),
    })
  })
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;