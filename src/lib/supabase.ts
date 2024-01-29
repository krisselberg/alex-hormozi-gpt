// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { HormoziTweet } from "./types";

export class Supabase {
  private client;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  async loginToSupabase() {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: process.env.SUPABASE_SERVICE_ROLE_EMAIL!,
      password: process.env.SUPABASE_SERVICE_ROLE_PASSWORD!,
    });

    if (error) throw error;
    console.log("Logged in as:", data.user?.email);
  }

  async writeToDatabase(data: HormoziTweet[]) {
    const { error } = await this.client.from("hormozi").insert([data]);

    if (error) throw error;
    console.log("Data written to the database");
  }
}
