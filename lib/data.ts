import { createClient } from '@/lib/supabase/server';

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  return data;
}

export async function getQuickLinks() {
  const supabase = await createClient();
  const { data } = await supabase.from('quick_links').select('*').order('sort_order');
  return data ?? [];
}

export async function getContentBySection(section: string, limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from('content_items')
    .select('*')
    .eq('section', section)
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('sort_order')
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);
  const { data } = await query;
  return data ?? [];
}

export async function getAnnouncements() {
  return getContentBySection('announcements', 6);
}

export async function getAdminData() {
  const supabase = await createClient();
  const [{ data: contentItems }, { data: links }, { data: contacts }, { data: feedback }] = await Promise.all([
    supabase.from('content_items').select('*').order('updated_at', { ascending: false }).limit(20),
    supabase.from('quick_links').select('*').order('sort_order').limit(20),
    supabase.from('directory_contacts').select('*').order('sort_order').limit(20),
    supabase.from('feedback_submissions').select('*').order('created_at', { ascending: false }).limit(20),
  ]);

  return { contentItems: contentItems ?? [], links: links ?? [], contacts: contacts ?? [], feedback: feedback ?? [] };
}
