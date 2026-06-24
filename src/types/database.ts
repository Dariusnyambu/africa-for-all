// ════════════════════════════════════════════════════════════════
// Database types — keep in sync with supabase/migrations/0001_init.sql
// ════════════════════════════════════════════════════════════════

export type AdminRole = "super_admin" | "editor";

export type AdminProfile = {
  id: string;
  full_name: string;
  role: AdminRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ImpactStat = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  display_order: number;
  is_published: boolean;
  updated_at: string;
};

export type Story = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string | null;
  cover_image_url: string | null;
  location: string | null;
  program_id: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PartnerCategory = "UN" | "NGO" | "Corporate" | "Foundation";

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  category: PartnerCategory;
  website_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export type DonationFrequency = "one_time" | "monthly";
export type DonationStatus = "pending" | "completed" | "failed" | "refunded";

export type Donation = {
  id: string;
  donor_name: string | null;
  donor_email: string;
  amount: number;
  currency: string;
  frequency: DonationFrequency;
  program_id: string | null;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  status: DonationStatus;
  is_test_mode: boolean;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
};

export type PartnershipInquiryStatus = "new" | "contacted" | "closed";

export type PartnershipInquiry = {
  id: string;
  organization_name: string;
  contact_name: string;
  email: string;
  category: string | null;
  message: string | null;
  status: PartnershipInquiryStatus;
  created_at: string;
};

// ──────────────────────────────────────────────────────────────
// Supabase generated-style Database interface
// ──────────────────────────────────────────────────────────────
export type Database = {
  public: {
    Tables: {
      admin_profiles: {
        Row: AdminProfile;
        Insert: Partial<AdminProfile> & { id: string; full_name: string };
        Update: Partial<AdminProfile>;
        Relationships: [];
      };
      programs: {
        Row: Program;
        Insert: Partial<Program> & { slug: string; title: string; summary: string };
        Update: Partial<Program>;
        Relationships: [];
      };
      impact_stats: {
        Row: ImpactStat;
        Insert: Partial<ImpactStat> & { label: string; value: number };
        Update: Partial<ImpactStat>;
        Relationships: [];
      };
      stories: {
        Row: Story;
        Insert: Partial<Story> & { slug: string; title: string; excerpt: string };
        Update: Partial<Story>;
        Relationships: [];
      };
      partners: {
        Row: Partner;
        Insert: Partial<Partner> & { name: string };
        Update: Partial<Partner>;
        Relationships: [];
      };
      donations: {
        Row: Donation;
        Insert: Partial<Donation> & {
          donor_email: string;
          amount: number;
          frequency: DonationFrequency;
        };
        Update: Partial<Donation>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Partial<ContactMessage> & { name: string; email: string; message: string };
        Update: Partial<ContactMessage>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: Partial<NewsletterSubscriber> & { email: string };
        Update: Partial<NewsletterSubscriber>;
        Relationships: [];
      };
      partnership_inquiries: {
        Row: PartnershipInquiry;
        Insert: Partial<PartnershipInquiry> & {
          organization_name: string;
          contact_name: string;
          email: string;
        };
        Update: Partial<PartnershipInquiry>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
