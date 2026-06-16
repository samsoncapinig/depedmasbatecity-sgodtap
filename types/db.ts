export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          role: 'admin' | 'editor' | 'viewer';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: 'admin' | 'editor' | 'viewer';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          role?: 'admin' | 'editor' | 'viewer';
          updated_at?: string;
        };
      };
      content_items: {
        Row: {
          id: string;
          section: string;
          title: string;
          slug: string | null;
          summary: string | null;
          body: string | null;
          file_url: string | null;
          external_url: string | null;
          published: boolean;
          featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          section: string;
          title: string;
          slug?: string | null;
          summary?: string | null;
          body?: string | null;
          file_url?: string | null;
          external_url?: string | null;
          published?: boolean;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          section?: string;
          title?: string;
          slug?: string | null;
          summary?: string | null;
          body?: string | null;
          file_url?: string | null;
          external_url?: string | null;
          published?: boolean;
          featured?: boolean;
          sort_order?: number;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      quick_links: {
        Row: {
          id: string;
          title: string;
          url: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          url: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          url?: string;
          sort_order?: number;
        };
      };
      directory_contacts: {
        Row: {
          id: string;
          name: string;
          position: string | null;
          email: string | null;
          phone: string | null;
          office: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          position?: string | null;
          email?: string | null;
          phone?: string | null;
          office?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          position?: string | null;
          email?: string | null;
          phone?: string | null;
          office?: string | null;
          sort_order?: number;
        };
      };
      feedback_submissions: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          message: string;
          status: 'new' | 'reviewed' | 'closed';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          message: string;
          status?: 'new' | 'reviewed' | 'closed';
          created_at?: string;
        };
        Update: {
          name?: string;
          email?: string | null;
          message?: string;
          status?: 'new' | 'reviewed' | 'closed';
        };
      };
      site_settings: {
        Row: {
          id: number;
          site_title: string;
          hero_title: string | null;
          hero_subtitle: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          site_title?: string;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          updated_at?: string;
        };
        Update: {
          site_title?: string;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          updated_at?: string;
        };
      };
    };
    Functions: {
      is_admin: {
        Args: { uid: string };
        Returns: boolean;
      };
    };
  };
};
