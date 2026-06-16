'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/utils';

async function requireAdmin() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', auth.user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/');
  }

  return { supabase, user: auth.user };
}

export async function createFeedback(formData: FormData) {
  const supabase = await createClient();
  await supabase.from('feedback_submissions').insert({
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim() || null,
    message: String(formData.get('message') || '').trim(),
  });

  revalidatePath('/feedback');
  redirect('/feedback?success=1');
}

export async function createContentItem(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const title = String(formData.get('title') || '').trim();
  await supabase.from('content_items').insert({
    section: String(formData.get('section') || '').trim(),
    title,
    slug: slugify(title),
    summary: String(formData.get('summary') || '').trim() || null,
    body: String(formData.get('body') || '').trim() || null,
    external_url: String(formData.get('external_url') || '').trim() || null,
    file_url: String(formData.get('file_url') || '').trim() || null,
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
    sort_order: Number(formData.get('sort_order') || 1),
    created_by: user.id,
  });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function createQuickLink(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('quick_links').insert({
    title: String(formData.get('title') || '').trim(),
    url: String(formData.get('url') || '').trim(),
    sort_order: Number(formData.get('sort_order') || 1),
  });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function createDirectoryContact(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('directory_contacts').insert({
    name: String(formData.get('name') || '').trim(),
    position: String(formData.get('position') || '').trim() || null,
    office: String(formData.get('office') || '').trim() || null,
    email: String(formData.get('email') || '').trim() || null,
    phone: String(formData.get('phone') || '').trim() || null,
    sort_order: Number(formData.get('sort_order') || 1),
  });

  revalidatePath('/directory');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateFeedbackStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase
    .from('feedback_submissions')
    .update({ status: String(formData.get('status') || 'reviewed') as 'new' | 'reviewed' | 'closed' })
    .eq('id', String(formData.get('id') || ''));

  revalidatePath('/admin');
  redirect('/admin');
}
