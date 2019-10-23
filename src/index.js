class LyricsOvh {
  constructor() {
    this.apiBaseUrl = 'https://api.lyrics.ovh/'
    this.apiSuggestUrl = `${this.apiBaseUrl}suggest/`
    this.apiSearchUrl = `${this.apiBaseUrl}v1/`

    this.getSuggest = this.getSuggest.bind(this)
    this.getLyric = this.getLyric.bind(this)
  }

  async getSuggest(word) {
    if (!word) throw 'Invalid parameter'
    try {
      const response = await fetch(`${this.apiSuggestUrl}${word}`)
      return await response.json()
    } catch (e) {
      throw e
    }
  }

  async getLyric(artist, music) {
    if (!artist || !music) throw 'Invalid parameters'
    try {
      const response = await fetch(`${this.apiSearchUrl}${artist}/${music}`)
      return await response.json()
    } catch (e) {
      throw e
    }
  }
}

export default LyricsOvh
