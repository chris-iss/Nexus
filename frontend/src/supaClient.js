import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://nimxewcbajddbaltrwmd.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbXhld2NiYWpkZGJhbHRyd21kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjM4MDc5OCwiZXhwIjoyMDQ3OTU2Nzk4fQ.ez-nMDbdgD0f9xv2uzZoy6kCPVjvE991OE9CTyJOyqg'; // Replace with your API key

export const supabase = createClient(supabaseUrl, supabaseKey);
