export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          created_at?: string
        }
      }
      videographers: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          location: string | null
          portfolio_url: string | null
          certifications: string | null
          gear_list: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          location?: string | null
          portfolio_url?: string | null
          certifications?: string | null
          gear_list?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          location?: string | null
          portfolio_url?: string | null
          certifications?: string | null
          gear_list?: string | null
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          status: string
          deadline: string | null
          created_at: string
          assigned_videographer_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          status: string
          deadline?: string | null
          created_at?: string
          assigned_videographer_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          status?: string
          deadline?: string | null
          created_at?: string
          assigned_videographer_id?: string | null
        }
      }
      assets: {
        Row: {
          id: string
          project_id: string
          uploaded_by_user: boolean
          name: string
          type: string
          file_url: string
          size_gb: number
          upload_date: string
          source: string
        }
        Insert: {
          id?: string
          project_id: string
          uploaded_by_user: boolean
          name: string
          type: string
          file_url: string
          size_gb: number
          upload_date?: string
          source: string
        }
        Update: {
          id?: string
          project_id?: string
          uploaded_by_user?: boolean
          name?: string
          type?: string
          file_url?: string
          size_gb?: number
          upload_date?: string
          source?: string
        }
      }
      project_assignments: {
        Row: {
          id: string
          project_id: string
          videographer_id: string
          assigned_by_admin_id: string | null
          status: string
          assigned_at: string
          submission_deadline: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          project_id: string
          videographer_id: string
          assigned_by_admin_id?: string | null
          status: string
          assigned_at?: string
          submission_deadline?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          videographer_id?: string
          assigned_by_admin_id?: string | null
          status?: string
          assigned_at?: string
          submission_deadline?: string | null
          notes?: string | null
        }
      }
      billing_usage: {
        Row: {
          id: string
          user_id: string
          month: string
          storage_used_gb: number
          transfer_used_gb: number
          storage_cost_usd: number
          transfer_cost_usd: number
        }
        Insert: {
          id?: string
          user_id: string
          month: string
          storage_used_gb?: number
          transfer_used_gb?: number
          storage_cost_usd?: number
          transfer_cost_usd?: number
        }
        Update: {
          id?: string
          user_id?: string
          month?: string
          storage_used_gb?: number
          transfer_used_gb?: number
          storage_cost_usd?: number
          transfer_cost_usd?: number
        }
      }
      usage_history: {
        Row: {
          id: string
          user_id: string
          storage_used_gb: number
          bandwidth_used_gb: number
          recorded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          storage_used_gb: number
          bandwidth_used_gb: number
          recorded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          storage_used_gb?: number
          bandwidth_used_gb?: number
          recorded_at?: string
        }
      }
      payouts: {
        Row: {
          id: string
          videographer_id: string
          project_id: string
          assignment_id: string
          status: string
          amount_usd: number
          payment_method: string
          admin_approved_by: string | null
          approved_at: string | null
          paid_at: string | null
          transaction_id: string | null
        }
        Insert: {
          id?: string
          videographer_id: string
          project_id: string
          assignment_id: string
          status: string
          amount_usd: number
          payment_method: string
          admin_approved_by?: string | null
          approved_at?: string | null
          paid_at?: string | null
          transaction_id?: string | null
        }
        Update: {
          id?: string
          videographer_id?: string
          project_id?: string
          assignment_id?: string
          status?: string
          amount_usd?: number
          payment_method?: string
          admin_approved_by?: string | null
          approved_at?: string | null
          paid_at?: string | null
          transaction_id?: string | null
        }
      }
      support_tickets: {
        Row: {
          id: string
          submitted_by_user_id: string | null
          submitted_by_videographer_id: string | null
          assigned_admin_id: string | null
          subject: string
          category: Database["public"]["Enums"]["ticket_category"]
          priority: Database["public"]["Enums"]["ticket_priority"]
          description: string
          attachment_url: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          submitted_by_user_id?: string | null
          submitted_by_videographer_id?: string | null
          assigned_admin_id?: string | null
          subject: string
          category: Database["public"]["Enums"]["ticket_category"]
          priority?: Database["public"]["Enums"]["ticket_priority"]
          description: string
          attachment_url?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          submitted_by_user_id?: string | null
          submitted_by_videographer_id?: string | null
          assigned_admin_id?: string | null
          subject?: string
          category?: Database["public"]["Enums"]["ticket_category"]
          priority?: Database["public"]["Enums"]["ticket_priority"]
          description?: string
          attachment_url?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          created_at?: string
          updated_at?: string
        }
      }
      system_logs: {
        Row: {
          id: string
          event_type: string
          details: Json
          user_id: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          event_type: string
          details: Json
          user_id?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          event_type?: string
          details?: Json
          user_id?: string | null
          timestamp?: string
        }
      }
      feature_toggles: {
        Row: {
          id: string
          feature_name: string
          enabled: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          feature_name: string
          enabled?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          feature_name?: string
          enabled?: boolean
          updated_at?: string
        }
      }
    }
    Enums: {
      ticket_category: "project" | "billing" | "account" | "technical" | "other"
      ticket_priority: "low" | "normal" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
    }
  }
}