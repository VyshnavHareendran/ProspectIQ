import httpClient from './httpClient'

export const businessApi = {
  getBusinesses: (params, config = {}) =>
    httpClient.get('/businesses', {
      ...config,
      params,
    }),
}
