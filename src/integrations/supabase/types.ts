export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          age: string
          bio: string | null
          covid_vaccinated: string
          created_at: string
          disclosure_authorization: string
          email: string
          first_name: string
          has_chronic_diseases: string
          has_herpes: string
          has_hiv: string
          has_hpv: string
          has_other_stds: string
          id: string
          last_name: string
          linkedin: string | null
          member_profile_name: string
          password_hash: string | null
          phone: string
          review_notes: string | null
          reviewed_at: string | null
          smokes_cigarettes: string
          status: string | null
          updated_at: string
          username: string | null
          uses_alcohol: string
          uses_drugs: string
          uses_marijuana: string
          uses_prescription_drugs: string
          wants_optional_testing: string
        }
        Insert: {
          age: string
          bio?: string | null
          covid_vaccinated: string
          created_at?: string
          disclosure_authorization: string
          email: string
          first_name: string
          has_chronic_diseases: string
          has_herpes: string
          has_hiv: string
          has_hpv: string
          has_other_stds: string
          id?: string
          last_name: string
          linkedin?: string | null
          member_profile_name: string
          password_hash?: string | null
          phone: string
          review_notes?: string | null
          reviewed_at?: string | null
          smokes_cigarettes: string
          status?: string | null
          updated_at?: string
          username?: string | null
          uses_alcohol: string
          uses_drugs: string
          uses_marijuana: string
          uses_prescription_drugs: string
          wants_optional_testing: string
        }
        Update: {
          age?: string
          bio?: string | null
          covid_vaccinated?: string
          created_at?: string
          disclosure_authorization?: string
          email?: string
          first_name?: string
          has_chronic_diseases?: string
          has_herpes?: string
          has_hiv?: string
          has_hpv?: string
          has_other_stds?: string
          id?: string
          last_name?: string
          linkedin?: string | null
          member_profile_name?: string
          password_hash?: string | null
          phone?: string
          review_notes?: string | null
          reviewed_at?: string | null
          smokes_cigarettes?: string
          status?: string | null
          updated_at?: string
          username?: string | null
          uses_alcohol?: string
          uses_drugs?: string
          uses_marijuana?: string
          uses_prescription_drugs?: string
          wants_optional_testing?: string
        }
        Relationships: []
      }
      auction_bids: {
        Row: {
          auction_id: string
          bid_amount: number
          bidder_id: string
          bidder_name: string
          created_at: string
          id: string
          message: string | null
          updated_at: string
        }
        Insert: {
          auction_id: string
          bid_amount: number
          bidder_id: string
          bidder_name: string
          created_at?: string
          id?: string
          message?: string | null
          updated_at?: string
        }
        Update: {
          auction_id?: string
          bid_amount?: number
          bidder_id?: string
          bidder_name?: string
          created_at?: string
          id?: string
          message?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "auction_bids_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "donation_auctions"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_auctions: {
        Row: {
          bio: string
          completed_at: string | null
          created_at: string
          current_highest_bid: number | null
          donation_type: string
          donor_name: string
          id: string
          photo_url: string | null
          starting_bid_amount: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bio: string
          completed_at?: string | null
          created_at?: string
          current_highest_bid?: number | null
          donation_type: string
          donor_name: string
          id?: string
          photo_url?: string | null
          starting_bid_amount: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string
          completed_at?: string | null
          created_at?: string
          current_highest_bid?: number | null
          donation_type?: string
          donor_name?: string
          id?: string
          photo_url?: string | null
          starting_bid_amount?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          favorited_at: string
          favorited_profile_id: string
          favorited_profile_name: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          favorited_at?: string
          favorited_profile_id: string
          favorited_profile_name: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          favorited_at?: string
          favorited_profile_id?: string
          favorited_profile_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read_at: string | null
          recipient_id: string
          recipient_name: string
          sender_id: string
          sender_name: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id: string
          recipient_name: string
          sender_id: string
          sender_name: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id?: string
          recipient_name?: string
          sender_id?: string
          sender_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      photo_access_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          photo_index: number
          profile_owner_id: string
          profile_owner_name: string
          requester_id: string
          requester_name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          photo_index: number
          profile_owner_id: string
          profile_owner_name: string
          requester_id: string
          requester_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          photo_index?: number
          profile_owner_id?: string
          profile_owner_name?: string
          requester_id?: string
          requester_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      promo_usage: {
        Row: {
          created_at: string
          id: string
          promo_code: string
          used_at: string
          user_email: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          promo_code: string
          used_at?: string
          user_email: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          promo_code?: string
          used_at?: string
          user_email?: string
          user_id?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          approved_at: string | null
          created_at: string
          id: string
          referred_email: string
          referred_user_id: string | null
          referrer_email: string
          referrer_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          id?: string
          referred_email: string
          referred_user_id?: string | null
          referrer_email: string
          referrer_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          id?: string
          referred_email?: string
          referred_user_id?: string | null
          referrer_email?: string
          referrer_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_first_month: boolean | null
          referral_credits: number | null
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_first_month?: boolean | null
          referral_credits?: number | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_first_month?: boolean | null
          referral_credits?: number | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
