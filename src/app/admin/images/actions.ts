'use server';

import { createClient } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';
import { Image } from './page';

import sizeOf from 'image-size';

export async function uploadImage(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get('file') as File;
  const altText = formData.get('altText') as string;
  const displayStyle = formData.get('displayStyle') as string;
  const position = 0; // Default position, will be managed by drag and drop later

  if (!file) {
    return { error: 'No file provided.' };
  }

  const filePath = file.name; // Store directly at the root of the bucket
  const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    return { error: uploadError.message };
  }

  // Read image dimensions
  let dimensions = { width: 0, height: 0 };
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    dimensions = sizeOf(buffer);
  } catch (e) {
    console.error('Error reading image dimensions:', e);
  }

  const { data, error: insertError } = await supabase
    .from('images')
    .insert({
      storage_path: filePath,
      alt_text: altText,
      position: position,
      display_style: displayStyle,
      width: dimensions.width,
      height: dimensions.height,
    })
    .select();

  if (insertError) {
    console.error('Error inserting image record:', insertError);
    // Optionally, delete the uploaded file if the database insert fails
    await supabase.storage.from('images').remove([filePath]);
    return { error: insertError.message };
  }

  revalidatePath('/admin/images');
  return { success: true, image: data[0] as Image };
}

export async function updateImage(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const altText = formData.get('altText') as string;
  const displayStyle = formData.get('displayStyle') as string;

  const { data, error } = await supabase
    .from('images')
    .update({
      alt_text: altText,
      display_style: displayStyle,
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating image:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/images');
  return { success: true, image: data[0] as Image };
}

export async function deleteImage(id: string, storagePath: string) {
  const supabase = await createClient();

  // Delete from storage
  const { error: storageError } = await supabase.storage.from('images').remove([storagePath]);

  if (storageError) {
    console.error('Error deleting image from storage:', storageError);
    return { error: storageError.message };
  }

  // Delete from database
  const { error: dbError } = await supabase.from('images').delete().eq('id', id);

  if (dbError) {
    console.error('Error deleting image record:', dbError);
    return { error: dbError.message };
  }

  revalidatePath('/admin/images');
  return { success: true };
}

export async function updateImagePositions(images: { id: string; position: number }[]) {
  const supabase = await createClient();

  const updatePromises = images.map(image =>
    supabase
      .from('images')
      .update({ position: image.position }) // Only update position
      .eq('id', image.id) // For the specific image ID
  );

  const results = await Promise.all(updatePromises);

  const errors = results.filter(result => result.error).map(result => result.error);

  if (errors.length > 0) {
    console.error('Error updating image positions:', errors);
    return { error: errors[0]?.message || 'Multiple errors occurred during position update.' };
  }

  revalidatePath('/admin/images');
  return { success: true };
}
