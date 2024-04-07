import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kvossromnsxtgsrbxtou.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2b3Nzcm9tbnN4dGdzcmJ4dG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4MDc0MDQsImV4cCI6MjAyNDM4MzQwNH0.W2Wsta3PR24LhvxnOCNkVbCkIorH76vgD6wyglc1mcg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
