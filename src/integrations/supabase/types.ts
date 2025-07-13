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
          phone: string
          review_notes: string | null
          reviewed_at: string | null
          smokes_cigarettes: string
          status: string | null
          updated_at: string
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
          phone: string
          review_notes?: string | null
          reviewed_at?: string | null
          smokes_cigarettes: string
          status?: string | null
          updated_at?: string
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
          phone?: string
          review_notes?: string | null
          reviewed_at?: string | null
          smokes_cigarettes?: string
          status?: string | null
          updated_at?: string
          uses_alcohol?: string
          uses_drugs?: string
          uses_marijuana?: string
          uses_prescription_drugs?: string
          wants_optional_testing?: string
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
