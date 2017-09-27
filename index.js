const Twitter = require('twitter')
const open = require('open')

const QUERY = /The National/i

const found = []
const params = { screen_name: 'Twickets' }

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

function run () {
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (error) return console.log(error)

    tweets.forEach(({ text }) => {
      if (!text.match(QUERY)) return

      const url = text.match(/https:\/\/.*$/)[0]
      if (!found.includes(url)) {
        open(url)
        found.push(url)
      }
    })
  })
}

console.log('Searching...')
setInterval(run, 1000)
