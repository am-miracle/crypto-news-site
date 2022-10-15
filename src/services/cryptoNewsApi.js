
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const cryptoNewsHeader =  {
//   "Accept": "application/vnd.api+json",
//   'X-BingApis-SDK': 'true',
//   'X-RapidAPI-Key': '129b2fc319msh341b23a0412e0abp1dab02jsn64e71a25960c',
//   'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_KE
// }

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bing-news-search1.p.rapidapi.com/',
    prepareHeaders(headers) {
        headers.set("Accept", "application/vnd.api+json")
        headers.set("X-BingApis-SDK", "application/vnd.api+json")
        headers.set("X-RapidAPI-Key", process.env.REACT_APP_RAPIDAPI_KEY)
        headers.set("X-RapidAPI-Host", 'bing-news-search1.p.rapidapi.com')
        return headers
    }
  }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: (newsCategory) => ({
        url: `/news/search?q=${newsCategory}`,
        method: 'GET',
      }),
    })
  })
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;