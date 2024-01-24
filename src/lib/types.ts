export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo",
}

export type HormoziTweet = {
  tweet_avatar: string;
  tweet_id: string;
  url: string;
  text: string;
  username: string;
  tweet_timestamp: string;
  retweets: number;
  images: string[];
  likes: number;
  embedding: number[];
};

export type HormoziJSON = Array<HormoziTweet>;
