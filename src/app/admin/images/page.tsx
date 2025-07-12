import { createClient } from '@/lib/supabaseServer';
import ImageAdminClientPage from '@/components/admin/ImageAdminClientPage';

export type Image = {
  id: string;
  created_at: string;
  storage_path: string;
  alt_text: string;
  position: number;
  display_style: string;
  width: number;
  height: number;
};

export default async function ImagesAdminPage() {
  const supabase = await createClient();
  const { data: images, error } = await supabase.from('images').select('*').order('position', { ascending: true });

  if (error) {
    console.error('Error fetching images:', error);
    return <div>Error loading images.</div>;
  }

  return (
    <ImageAdminClientPage initialImages={images as Image[]} />
  );
}
