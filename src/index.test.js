import LyricsOvh from './index'

global.fetch = require('jest-fetch-mock')

describe('LyricsOvh', () => {
  let lovh

  beforeEach(() => {
    lovh = new LyricsOvh()
  })

  afterEach(() => {
    fetch.resetMocks()
  })

  describe('smoke tests', () => {
    it('should LyricsOvh exists', () => {
      expect(lovh).toBeDefined()
    })

    it('should have apiBaseUrl, apiSuggestUrl, apiSearchUrl properties', () => {
      expect(lovh).toHaveProperty('apiBaseUrl')
      expect(lovh).toHaveProperty('apiSuggestUrl')
      expect(lovh).toHaveProperty('apiSearchUrl')
    })
  })

  // to use async await https://jestjs.io/docs/en/getting-started#using-babel
  // to use fetch yarn add --dev jest-fetch-mock
  describe('getSuggest', () => {
    it('should throw an error if word parameter not exists', async () => {
      try {
        await lovh.getSuggest()
      } catch (e) {
        expect(e).toEqual('Invalid parameter')
      }
    })
    it('should fetch been called one time', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: [] }))
      lovh.getSuggest('lua de')
      expect(fetch.mock.calls.length).toEqual(1)
    })

    it('should fetch been called with correct url', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: [] }))
      lovh.getSuggest('lua')
      expect(fetch.mock.calls[0][0]).toEqual(
        'https://api.lyrics.ovh/suggest/lua'
      )
    })

    it('should fetch been resolved with data attribute as array type', async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: [], total: 1 }))
      const response = await lovh.getSuggest('lua de')
      expect(response).toHaveProperty('data')
      expect(response).toHaveProperty('total')
      expect(Array.isArray(response.data)).toBe(true)
    })

    it('should fetch dispatch an error', async () => {
      let response = { fail: true }
      fetch.mockReject(response)
      try {
        await lovh.getSuggest('lua')
      } catch (e) {
        expect(e).toEqual(response)
      }
    })

    it('should return total : 0 property when not found result', async () => {
      const expected = { total: 0 }
      fetch.mockResponseOnce(JSON.stringify(expected))
      const response = await lovh.getSuggest('luaaaaaaaa')
      expect(response.total).toEqual(expected.total)
    })
  })

  describe('getLyric', () => {
    it('should throw an error if artist or music not exists', async () => {
      try {
        await lovh.getLyric()
      } catch (e) {
        expect(e).toEqual('Invalid parameters')
      }
    })

    it('should fetch been called with correct url', () => {
      fetch.mockResponseOnce(JSON.stringify({ data: [] }))
      lovh.getLyric('xuxa', 'lua')
      expect(fetch.mock.calls[0][0]).toEqual(
        'https://api.lyrics.ovh/v1/xuxa/lua'
      )
    })

    it('should fetch return expected value when no error occurs', async () => {
      fetch.mockResponseOnce(JSON.stringify({ lyrics: '' }))
      const response = await lovh.getLyric('Coldplay', 'Adventure of a Life')
      expect(response).toHaveProperty('lyrics')
    })

    // fetch throw error if error occurs

    it('should fetch throw error if error occurs', async () => {
      let response = { fail: true }
      fetch.mockReject(response)
      try {
        await lovh.getLyric('Coldplay', 'Adventure of a Life')
      } catch (e) {
        expect(e).toEqual(response)
      }
    })
  })
})
