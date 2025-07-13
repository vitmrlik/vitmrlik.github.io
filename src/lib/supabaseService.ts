import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { GratitudeEntry, User, Category } from "../types";

// These would typically be environment variables
const supabaseUrl = "https://bkhdfjnuxrvrytzibryv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJraGRmam51eHJ2cnl0emlicnl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMzYxNTUsImV4cCI6MjA1ODkxMjE1NX0.eVytqCIXt9MIF0VmtVaJnjyaW6Rr4DeOzbyUCdfcids";

class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  // Auth methods
  async signUp(email: string, password: string, name: string): Promise<User | null> {
    try {
      // 1. Create Auth User
      const { data: authData, error: authError } = await this.client.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (authError || !authData.user) {
        console.error("Error signing up:", authError?.message);
        return null;
      }

      const userId = authData.user.id;

      // 2. Insert into users table - automatically by Supabase
      // 3. Insert into settings table
      // 4. Insert into challenges table

      // Success
      console.log("User signed up successfully:", authData.user.email);
      return {
        id: userId,
        email,
        name,
      };
    } catch (error) {
      console.error("Unexpected error signing up:", error);
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        return null;
      }

      if (data.user) {
        let userData = data.user.user_metadata as User;
        userData.id = data.user.id;
        console.log(userData, "userData");

        const { data: userChallenges, error } = await this.client
          .from("challenges")
          .select("*")
          .eq("user_id", userData.id);

        console.log(userChallenges, "userChallenges");
        if (error) {
          console.error("Error fetching user challenges:", error.message);
          return null;
        }
        userData.challenges = userChallenges || [];
        const { data: userSettings, error: settingsError } = await this.client
          .from("settings")
          .select("*")
          .eq("user_id", userData.id)
          .single();
        if (settingsError) {
          console.error("Error fetching user settings:", settingsError.message);
          return null;
        }
        userData.settings = userSettings || {};
        // Check if user has challenges and settings in the database

        return userData;
      }

      return null;
    } catch (error) {
      console.error("Error signing in:", error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }

  async resetPassword(email: string): Promise<boolean> {
    const { error } = await this.client.auth.resetPasswordForEmail(email);

    if (error) {
      console.error("Error resetting password:", error.message);
      return false;
    }

    return true;
  }

  // User data methods
  async getUser(userId: string): Promise<User | null> {
    try {
      const { data, error } = await this.client.from("users").select("*").eq("id", userId).single();

      if (error) {
        console.error("Error fetching user:", error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  async updateUser(user: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await this.client.from("users").update(user).eq("id", user.id).select().single();

      if (error) {
        console.error("Error updating user:", error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }

  // Gratitude entries methods
  async getEntries(userId: string): Promise<GratitudeEntry[]> {
    try {
      const { data, error } = await this.client
        .from("gratitude_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching entries:", error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching entries:", error);
      return [];
    }
  }

  async getEntriesByDate(userId: string, date: string): Promise<GratitudeEntry[]> {
    try {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const { data, error } = await this.client
        .from("gratitude_entries")
        .select("*")
        .eq("user_id", userId)
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());

      if (error) {
        console.error("Error fetching entries by date:", error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching entries by date:", error);
      return [];
    }
  }

  async createEntry(entry: Omit<GratitudeEntry, "id" | "created_at" | "updated_at">): Promise<GratitudeEntry | null> {
    try {
      const newEntry = {
        ...entry,
      };

      console.log(newEntry, "newEntry");
      const { data, error } = await this.client.from("gratitude_entries").insert([newEntry]).select().single();

      if (error) {
        console.error("Error creating entry:", error.message);
        return null;
      }

      // Update user challenges
      await this.updateChallengeProgress(entry.user_id, entry.category);

      return data;
    } catch (error) {
      console.error("Error creating entry:", error);
      return null;
    }
  }

  async updateEntry(entry: Partial<GratitudeEntry>): Promise<GratitudeEntry | null> {
    try {
      const updatedEntry = {
        ...entry,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.client
        .from("gratitude_entries")
        .update(updatedEntry)
        .eq("id", entry.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating entry:", error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error updating entry:", error);
      return null;
    }
  }

  async deleteEntry(entryId: string): Promise<boolean> {
    try {
      const { error } = await this.client.from("gratitude_entries").delete().eq("id", entryId);

      if (error) {
        console.error("Error deleting entry:", error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting entry:", error);
      return false;
    }
  }

  // Challenge progress methods
  private async updateChallengeProgress(userId: string, category: string): Promise<void> {
    try {
      const { data: challengeData } = await this.client
        .from("challenges")
        .select("*")
        .eq("user_id", userId)
        .eq("category", category)
        .single();

      if (!challengeData || !challengeData.unlocked) return;

      const updated = {
        days_completed: challengeData.days_completed + 1,
        current_streak: challengeData.current_streak + 1,
        max_streak: Math.max(challengeData.max_streak, challengeData.current_streak + 1),
      };

      if (updated.days_completed >= challengeData.days_required) {
        updated["completed"] = true;

        // Odemkni další challenge podle pořadí kategorií
        const categoryOrder = ["gratitude", "self-admiration", "self-appreciation", "others-admiration"];
        const nextCategory = categoryOrder[categoryOrder.indexOf(category) + 1];

        if (nextCategory) {
          await this.client
            .from("challenges")
            .update({ unlocked: true })
            .eq("user_id", userId)
            .eq("category", nextCategory);
        }
      }

      await this.client.from("challenges").update(updated).eq("id", challengeData.id);
    } catch (error) {
      console.error("Error updating challenge progress:", error);
    }
  }
}

export const supabaseService = new SupabaseService();
