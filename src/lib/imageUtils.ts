import { createClient } from '@/lib/supabaseServer';
import { Image } from '@/app/admin/images/page'; // Re-use the Image type

export async function getImages(): Promise<Image[]> {
  const supabase = await createClient();
  const { data: images, error } = await supabase
    .from('images')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    console.error(`Error fetching images:`, error);
    return [];
  }

  return images as Image[];
}
