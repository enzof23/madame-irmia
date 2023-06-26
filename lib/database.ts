export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      chat: {
        Row: {
          activity_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          activity_id: string;
          id: string;
          user_id: string;
        };
        Update: {
          activity_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      historique: {
        Row: {
          categorie: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          categorie: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          categorie?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "historique_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      horoscope: {
        Row: {
          activity_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          activity_id: string;
          id: string;
          user_id: string;
        };
        Update: {
          activity_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "horoscope_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          auth_id: string;
          birthday: string;
          birthtime: string | null;
          created_at: string;
          email: string;
          gender: string;
          id: number;
          username: string;
        };
        Insert: {
          auth_id: string;
          birthday: string;
          birthtime?: string | null;
          created_at?: string;
          email: string;
          gender: string;
          id?: number;
          username: string;
        };
        Update: {
          auth_id?: string;
          birthday?: string;
          birthtime?: string | null;
          created_at?: string;
          email?: string;
          gender?: string;
          id?: number;
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
          activity_id: string;
          created_at: string;
          first_cardID: string;
          first_reading: string;
          id: number;
          question: string;
          second_cardID: string;
          second_reading: string;
          third_cardID: string;
          third_reading: string;
          user_id: string;
        };
        Insert: {
          activity_id: string;
          created_at?: string;
          first_cardID: string;
          first_reading: string;
          id?: number;
          question: string;
          second_cardID: string;
          second_reading: string;
          third_cardID: string;
          third_reading: string;
          user_id: string;
        };
        Update: {
          activity_id?: string;
          created_at?: string;
          first_cardID?: string;
          first_reading?: string;
          id?: number;
          question?: string;
          second_cardID?: string;
          second_reading?: string;
          third_cardID?: string;
          third_reading?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tarot_activity_id_fkey";
            columns: ["activity_id"];
            referencedRelation: "historique";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tarot_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_credits: {
        Row: {
          credits: number;
          id: string;
          stripe_customer: string | null;
          user_id: string;
        };
        Insert: {
          credits?: number;
          id?: string;
          stripe_customer?: string | null;
          user_id: string;
        };
        Update: {
          credits?: number;
          id?: string;
          stripe_customer?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey";
            columns: ["user_id"];
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

export type SUPABASE_HISTORIQUE =
  Database["public"]["Tables"]["historique"]["Row"];

export type SUPABASE_TAROT = Database["public"]["Tables"]["tarot"]["Row"];

export type SUPABASE_CREDITS =
  Database["public"]["Tables"]["user_credits"]["Row"];
