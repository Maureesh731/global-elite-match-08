export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
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
          password_hash: string
          phone: string
          review_notes: string | null
          reviewed_at: string | null
          smokes_cigarettes: string
          status: string
          user_id: string | null
          username: string
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
          password_hash: string
          phone: string
          review_notes?: string | null
          reviewed_at?: string | null
          smokes_cigarettes: string
          status?: string
          user_id?: string | null
          username: string
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
          password_hash?: string
          phone?: string
          review_notes?: string | null
          reviewed_at?: string | null
          smokes_cigarettes?: string
          status?: string
          user_id?: string | null
          username?: string
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
        }
        Insert: {
          auction_id: string
          bid_amount: number
          bidder_id: string
          bidder_name: string
          created_at?: string
          id?: string
          message?: string | null
        }
        Update: {
          auction_id?: string
          bid_amount?: number
          bidder_id?: string
          bidder_name?: string
          created_at?: string
          id?: string
          message?: string | null
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
      auction_payments: {
        Row: {
          auction_id: string
          created_at: string
          donor_id: string
          donor_payout_amount: number
          id: string
          payment_status: string
          platform_fee_amount: number
          processed_at: string | null
          winner_id: string
          winning_bid_amount: number
        }
        Insert: {
          auction_id: string
          created_at?: string
          donor_id: string
          donor_payout_amount: number
          id?: string
          payment_status?: string
          platform_fee_amount: number
          processed_at?: string | null
          winner_id: string
          winning_bid_amount: number
        }
        Update: {
          auction_id?: string
          created_at?: string
          donor_id?: string
          donor_payout_amount?: number
          id?: string
          payment_status?: string
          platform_fee_amount?: number
          processed_at?: string | null
          winner_id?: string
          winning_bid_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "auction_payments_auction_id_fkey"
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
          current_highest_bid: number
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
          current_highest_bid?: number
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
          current_highest_bid?: number
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
          responded_at: string | null
          status: string
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
          responded_at?: string | null
          status?: string
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
          responded_at?: string | null
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: string
          bio: string | null
          created_at: string
          full_name: string
          gender: string
          health_status: string | null
          id: string
          photo_urls: string[] | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age: string
          bio?: string | null
          created_at?: string
          full_name: string
          gender: string
          health_status?: string | null
          id?: string
          photo_urls?: string[] | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: string
          bio?: string | null
          created_at?: string
          full_name?: string
          gender?: string
          health_status?: string | null
          id?: string
          photo_urls?: string[] | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_usage: {
        Row: {
          created_at: string
          id: string
          promo_code: string
          used_at: string
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          promo_code: string
          used_at?: string
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          promo_code?: string
          used_at?: string
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_email: string
          referrer_email: string
          referrer_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_email: string
          referrer_email: string
          referrer_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_email?: string
          referrer_email?: string
          referrer_id?: string
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_auction_with_fees: {
        Args: { _auction_id: string; _winning_bid_id: string }
        Returns: {
          donor_payout: number
          error: string
          payment_id: string
          platform_fee: number
          success: boolean
          winning_bid_amount: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
