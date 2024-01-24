import { HormoziTweet, HormoziJSON } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const generateEmbeddings = async (tweets: HormoziTweet[]) => {
  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i];

    const {
      tweet_id,
      url,
      text,
      username,
      tweet_timestamp,
      retweets,
      images,
      likes,
    } = tweet;

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    // embeddingResponse.data is an array of Embedding objects
    // with fields { embedding: Array<number>, index: number, object: string }
    // we only want the embedding field
    const embeddingData = embeddingResponse.data;
    // Flatten the array of embeddings into a single array of numbers
    const embedding = embeddingData.flatMap((embedding) => embedding.embedding);

    const { data, error } = await supabase
      .from("hormozi")
      .insert({
        tweet_id,
        url,
        text,
        username,
        tweet_timestamp,
        retweets: retweets,
        images,
        likes: likes,
        embedding: embedding,
      })
      .select("*");

    if (error) {
      console.log("error", error);
    } else {
      console.log("saved", i, data);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

(async () => {
  const tweets: HormoziJSON = JSON.parse(
    fs.readFileSync("src/scripts/hormozi.json", "utf8")
  );

  await generateEmbeddings(tweets);
})();
