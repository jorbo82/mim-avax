export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      defi_exchanges: {
        Row: {
          api_endpoint: string | null
          created_at: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          api_endpoint?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          api_endpoint?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      defi_prices: {
        Row: {
          created_at: string
          id: string
          price: number
          price_change_24h: number | null
          price_usd: number | null
          timestamp: string
          trading_pair_id: string
          volume_24h: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          price_change_24h?: number | null
          price_usd?: number | null
          timestamp?: string
          trading_pair_id: string
          volume_24h?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          price_change_24h?: number | null
          price_usd?: number | null
          timestamp?: string
          trading_pair_id?: string
          volume_24h?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "defi_prices_trading_pair_id_fkey"
            columns: ["trading_pair_id"]
            isOneToOne: false
            referencedRelation: "defi_trading_pairs"
            referencedColumns: ["id"]
          },
        ]
      }
      defi_swap_history: {
        Row: {
          completed_at: string | null
          created_at: string
          exchange_id: string
          exchange_rate: number
          from_amount: number
          from_token_id: string
          gas_fee: number | null
          id: string
          status: string
          to_amount: number
          to_token_id: string
          transaction_hash: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          exchange_id: string
          exchange_rate: number
          from_amount: number
          from_token_id: string
          gas_fee?: number | null
          id?: string
          status?: string
          to_amount: number
          to_token_id: string
          transaction_hash?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          exchange_id?: string
          exchange_rate?: number
          from_amount?: number
          from_token_id?: string
          gas_fee?: number | null
          id?: string
          status?: string
          to_amount?: number
          to_token_id?: string
          transaction_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "defi_swap_history_exchange_id_fkey"
            columns: ["exchange_id"]
            isOneToOne: false
            referencedRelation: "defi_exchanges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "defi_swap_history_from_token_id_fkey"
            columns: ["from_token_id"]
            isOneToOne: false
            referencedRelation: "defi_tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "defi_swap_history_to_token_id_fkey"
            columns: ["to_token_id"]
            isOneToOne: false
            referencedRelation: "defi_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      defi_tokens: {
        Row: {
          contract_address: string | null
          created_at: string
          decimals: number
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          symbol: string
          updated_at: string
        }
        Insert: {
          contract_address?: string | null
          created_at?: string
          decimals?: number
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          symbol: string
          updated_at?: string
        }
        Update: {
          contract_address?: string | null
          created_at?: string
          decimals?: number
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          symbol?: string
          updated_at?: string
        }
        Relationships: []
      }
      defi_trading_pairs: {
        Row: {
          base_token_id: string
          created_at: string
          exchange_id: string
          id: string
          is_active: boolean
          liquidity_usd: number | null
          pair_address: string | null
          quote_token_id: string
          updated_at: string
          volume_24h_usd: number | null
        }
        Insert: {
          base_token_id: string
          created_at?: string
          exchange_id: string
          id?: string
          is_active?: boolean
          liquidity_usd?: number | null
          pair_address?: string | null
          quote_token_id: string
          updated_at?: string
          volume_24h_usd?: number | null
        }
        Update: {
          base_token_id?: string
          created_at?: string
          exchange_id?: string
          id?: string
          is_active?: boolean
          liquidity_usd?: number | null
          pair_address?: string | null
          quote_token_id?: string
          updated_at?: string
          volume_24h_usd?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "defi_trading_pairs_base_token_id_fkey"
            columns: ["base_token_id"]
            isOneToOne: false
            referencedRelation: "defi_tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "defi_trading_pairs_exchange_id_fkey"
            columns: ["exchange_id"]
            isOneToOne: false
            referencedRelation: "defi_exchanges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "defi_trading_pairs_quote_token_id_fkey"
            columns: ["quote_token_id"]
            isOneToOne: false
            referencedRelation: "defi_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      image_generation_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          job_type: string
          openai_response: Json | null
          prompt: string
          quality: string
          size: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_type: string
          openai_response?: Json | null
          prompt: string
          quality?: string
          size?: string
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_type?: string
          openai_response?: Json | null
          prompt?: string
          quality?: string
          size?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      reference_images: {
        Row: {
          created_at: string
          file_size: number
          filename: string
          id: string
          mime_type: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_size: number
          filename: string
          id?: string
          mime_type: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_size?: number
          filename?: string
          id?: string
          mime_type?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: []
      }
      user_generation_limits: {
        Row: {
          created_at: string
          date: string
          generation_count: number
          id: string
          override_timestamp: string | null
          override_used: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          generation_count?: number
          id?: string
          override_timestamp?: string | null
          override_used?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          generation_count?: number
          id?: string
          override_timestamp?: string | null
          override_used?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_favorite: boolean
          job_id: string | null
          job_type: string
          prompt: string
          quality: string
          size: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_favorite?: boolean
          job_id?: string | null
          job_type: string
          prompt: string
          quality: string
          size: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_favorite?: boolean
          job_id?: string | null
          job_type?: string
          prompt?: string
          quality?: string
          size?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_images_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "image_generation_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_best_rates: {
        Args: { base_token_symbol: string; quote_token_symbol: string }
        Returns: {
          exchange_name: string
          exchange_slug: string
          price: number
          liquidity_usd: number
          volume_24h_usd: number
          price_change_24h: number
        }[]
      }
      get_user_storage_stats: {
        Args: { user_uuid: string }
        Returns: {
          image_count: number
          storage_limit: number
          remaining_slots: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
