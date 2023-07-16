export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      historique: {
        Row: {
          categorie: string;
          created_at: string;
          historique_id: string;
          auth_id: string;
        };
        Insert: {
          categorie: string;
          created_at?: string;
          historique_id?: string;
          auth_id: string;
        };
        Update: {
          categorie?: string;
          created_at?: string;
          historique_id?: string;
          auth_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "historique_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          auth_id: string;
          birthdate: string;
          birthtime: string | null;
          created_at: string;
          email: string;
          gender: string;
          profile_id: string;
          username: string;
        };
        Insert: {
          auth_id: string;
          birthdate: string;
          birthtime?: string | null;
          created_at?: string;
          email: string;
          gender: string;
          profile_id?: string;
          username: string;
        };
        Update: {
          auth_id?: string;
          birthdate?: string;
          birthtime?: string | null;
          created_at?: string;
          email?: string;
          gender?: string;
          profile_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tarot: {
        Row: {
          auth_id: string;
          created_at: string;
          first_card_name: string;
          first_card_reading: string;
          historique_id: string;
          question: string;
          second_card_name: string;
          second_card_reading: string;
          tarot_id: string;
          third_card_name: string;
          third_card_reading: string;
        };
        Insert: {
          auth_id: string;
          created_at?: string;
          first_card_name: string;
          first_card_reading: string;
          historique_id: string;
          question: string;
          second_card_name: string;
          second_card_reading: string;
          tarot_id?: string;
          third_card_name: string;
          third_card_reading: string;
        };
        Update: {
          auth_id?: string;
          created_at?: string;
          first_card_name?: string;
          first_card_reading?: string;
          historique_id?: string;
          question?: string;
          second_card_name?: string;
          second_card_reading?: string;
          tarot_id?: string;
          third_card_name?: string;
          third_card_reading?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tarot_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tarot_historique_id_fkey";
            columns: ["historique_id"];
            referencedRelation: "historique";
            referencedColumns: ["historique_id"];
          }
        ];
      };
      user_credits: {
        Row: {
          auth_id: string;
          credits_amount: number;
          credits_id: string;
        };
        Insert: {
          auth_id: string;
          credits_amount?: number;
          credits_id?: string;
        };
        Update: {
          auth_id?: string;
          credits_amount?: number;
          credits_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_credits_auth_id_fkey";
            columns: ["auth_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type SUPABASE_PROFILES = Database["public"]["Tables"]["profiles"]["Row"];
export type PROFILES_UPDATE =
  Database["public"]["Tables"]["profiles"]["Update"];

export type SUPABASE_CREDITS =
  Database["public"]["Tables"]["user_credits"]["Row"];

export type SUPABASE_HISTORIQUE =
  Database["public"]["Tables"]["historique"]["Row"];

export type SUPABASE_TAROT = Database["public"]["Tables"]["tarot"]["Row"];
