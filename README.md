# Alex Hormozi GPT

Inspired by the amazing [Paul Graham GPT](https://github.com/mckaywrigley/paul-graham-gpt) by [McKay Wrigley](https://twitter.com/mckaywrigley)!

## How it works

Alex Hormozi GPT provides 2 things:

A search interface.
A chat interface.

### Search

Search was created with OpenAI Embeddings (text-embedding-ada-002).

First, we loop over the tweets and generate embeddings for each chunk of text.

Then in the app we take the user's search query, generate an embedding, and use the result to find the most similar passages from the book.

The comparison is done using cosine similarity across our database of vectors.

Our database is a Postgres database with the pgvector extension hosted on Supabase.

Results are ranked by similarity score and returned to the user.

### Chat

Chat builds on top of search. It uses search results to create a prompt that is fed into GPT-3.5-turbo.

This allows for a chat-like experience where the user can ask questions about the tweets and get answers.

## Quickstart (Running Locally)

Here's a quick overview of how to run it locally.

### Requirements

- Set up OpenAI: You'll need an OpenAI API key to generate embeddings.

- Set up Supabase and create a database
  Note: You don't have to use Supabase. Use whatever method you prefer to store your data.

There is a schema.sql file in the root of the repo that you can use to set up the database.

Run that in the SQL editor in Supabase as directed.

I recommend turning on Row Level Security and setting up a service role to use with the app.

### Repo Setup

#### Clone repo

```bash
git clone https://github.com/mckaywrigley/paul-graham-gpt.git
```

#### Install dependencies

```bash
npm i
```

#### Set up environment variables

Create a .env file with variables listed in the .env.example

#### Dataset

Unfortunately, the tweet scraper used to get Alex Hormozi's tweets was deprecated (Apify's Tweet Flash Plus) a few days after I used it. Feel free to use the hormozi.json file included in the repo or the Twitter API/an alternative scraping method to get a JSON of tweets.

#### Run embedding script

```bash
npm run embed
```

This reads the json file, generates embeddings for each chunk of text, and saves the results to your database.

There is a 200ms delay between each request to avoid rate limiting.

Run app

```bash
npm run dev
```

## Credits

Thanks to Alex Hormozi for his timeless wisdom. I first started watching his YouTube videos around a year ago, and they have shaped many of the beliefs I have about work and life. My favorite quote of his: "Volume negates luck"

Thanks again to [McKay Wrigley](https://twitter.com/mckaywrigley) for his creation of [Paul Graham GPT](https://github.com/mckaywrigley/paul-graham-gpt). This project could not have been created without his template.
