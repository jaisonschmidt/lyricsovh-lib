# Lyrics-ovh

A simple library that works with lyrics.ovh API. You can get suggests and lyrics over artist and music name.

## Installation

Use the package manager [NPM](https://npmjs.com) to install Lyrics-ovh.

```bash
npm i lyricsovh-lib
```

## Usage

```JavaScript
<script src="lyrics-ovh-js.min.js"></script>
<script>
    const lyrics = new LyricsOvh()

    lyrics
        .getLyric('Coldplay', 'Adventure of a Lifetime')
        .then(res => console.log(res.lyrics))

    lyrics.getSuggest('Coldplay')
        .then(res => console.log(res.data))
</script>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
