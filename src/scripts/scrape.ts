import { HormoziTweet } from "@/lib/types";
import fs from "fs";
import { ApifyClient } from "apify-client";
import { createClient } from "@supabase/supabase-js";

//
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function loginToSupabase() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.SUPABASE_SERVICE_ROLE_EMAIL!,
    password: process.env.SUPABASE_SERVICE_ROLE_PASSWORD!,
  });

  if (error) throw error;
  console.log("Logged in as:", data.user?.email);
}

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

// Prepare Actor input for https://apify.com/shanes/tweet-flash
const input = {
  queries: ["hello world"],
  absolute_max_tweets: 50000,
  language: "any",
  use_experimental_scraper: true, // Activates an experimental profile scraper that uses the user timeline instead of search and should have a few months of history (can go back a few months rather than 10 days)
  user_info: "user info and replying info",
  max_attempts: 2,
};

// function that uses Apify to scrape tweets from Alex Hormozi's Twitter
// and saves them to a JSON file
async function scrapeTweets() {
  // Run the Actor and wait for it to finish
  const run = await client.actor("wHMoznVs94gOcxcZl").call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  items.forEach((item) => {
    console.dir(item);
  });
}

// function that adds the embedding field to all tweets
async function addEmbeddingFieldToTweets() {
  const filePath = "src/scripts/hormozi.json";
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedData = data.map((tweet: HormoziTweet) => ({
    ...tweet,
    embedding: [],
  }));

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  console.log("Embedding field added to all tweets.");
}

// function that renames the timestamp field to tweet_timestamp
async function renameTimestampField() {
  const filePath = "src/scripts/hormozi.json";
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedData = data.map((tweet: any) => {
    const { timestamp, ...rest } = tweet;
    return { ...rest, tweet_timestamp: timestamp };
  });

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  console.log("Timestamp field renamed to tweet_timestamp.");
}

async function writeToDatabase(data: HormoziTweet[]) {
  const { error } = await supabase.from("hormozi").insert([data]);

  if (error) throw error;
  console.log("Data written to the database");
}

scrapeTweets();
