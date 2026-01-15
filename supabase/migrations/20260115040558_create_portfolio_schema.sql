/*
  # Portfolio Database Schema

  ## Overview
  Creates the complete database structure for the AI developer portfolio website.
  This includes tables for dynamic content management and user interactions.

  ## New Tables
  
  ### 1. `contact_submissions`
  Stores contact form submissions from potential clients and collaborators.
  - `id` (uuid, primary key)
  - `name` (text) - Full name of the person contacting
  - `email` (text) - Email address
  - `subject` (text) - Subject of inquiry
  - `message` (text) - Detailed message
  - `created_at` (timestamp) - Submission timestamp
  - `status` (text) - Processing status (new, read, responded)

  ### 2. `testimonials`
  Stores client testimonials and recommendations.
  - `id` (uuid, primary key)
  - `client_name` (text) - Name of the client
  - `client_title` (text) - Job title
  - `client_company` (text) - Company name
  - `content` (text) - Testimonial content
  - `rating` (integer) - Rating out of 5
  - `project_type` (text) - Type of project
  - `is_featured` (boolean) - Display on homepage
  - `display_order` (integer) - Order of display
  - `created_at` (timestamp)

  ### 3. `blog_posts`
  Stores blog articles and insights.
  - `id` (uuid, primary key)
  - `title` (text) - Post title
  - `slug` (text, unique) - URL-friendly slug
  - `excerpt` (text) - Short summary
  - `content` (text) - Full content (markdown)
  - `cover_image` (text) - URL to cover image
  - `tags` (text array) - Post tags
  - `reading_time` (integer) - Estimated reading time in minutes
  - `view_count` (integer) - Number of views
  - `is_published` (boolean) - Publication status
  - `published_at` (timestamp)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### 4. `experience`
  Stores professional experience and roles.
  - `id` (uuid, primary key)
  - `company` (text) - Company name
  - `role` (text) - Job title
  - `description` (text) - Role description
  - `start_date` (date) - Start date
  - `end_date` (date, nullable) - End date (null for current)
  - `technologies` (text array) - Technologies used
  - `achievements` (text array) - Key achievements
  - `display_order` (integer) - Order of display
  - `created_at` (timestamp)

  ### 5. `projects`
  Stores portfolio projects for dynamic management.
  - `id` (uuid, primary key)
  - `title` (text) - Project title
  - `slug` (text, unique) - URL-friendly slug
  - `category` (text) - Project category
  - `description` (text) - Short description
  - `full_description` (text) - Detailed description
  - `technologies` (text array) - Tech stack
  - `year` (text) - Year completed
  - `client` (text, nullable) - Client name
  - `metrics` (jsonb) - Project metrics and outcomes
  - `is_featured` (boolean) - Display on homepage
  - `display_order` (integer) - Order of display
  - `created_at` (timestamp)

  ## Security
  - RLS enabled on all tables
  - Public read access for published content
  - Admin-only write access
  - Contact submissions: insert-only for public
*/

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text NOT NULL,
  client_company text NOT NULL,
  content text NOT NULL,
  rating integer DEFAULT 5,
  project_type text,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are publicly readable"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image text,
  tags text[] DEFAULT '{}',
  reading_time integer DEFAULT 5,
  view_count integer DEFAULT 0,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are publicly readable"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  role text NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  technologies text[] DEFAULT '{}',
  achievements text[] DEFAULT '{}',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experience is publicly readable"
  ON experience FOR SELECT
  TO anon, authenticated
  USING (true);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  full_description text,
  technologies text[] DEFAULT '{}',
  year text NOT NULL,
  client text,
  metrics jsonb DEFAULT '{}',
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly readable"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured, display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured, display_order);
CREATE INDEX IF NOT EXISTS idx_experience_order ON experience(display_order);
