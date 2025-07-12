'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { uploadImage, updateImage, deleteImage, updateImagePositions } from '@/app/admin/images/actions';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageAdminClientPageProps {
  initialImages: Image[];
}

import { useRouter } from 'next/navigation';

// Component for a sortable row
function SortableImageRow({ image, getPublicUrl, startEditing, handleDelete }: {
  image: Image;
  getPublicUrl: (path: string) => string;
  startEditing: (image: Image) => void;
  handleDelete: (id: string, storagePath: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} className="relative">
      <td className="py-2 px-4 border-b">
        <button {...listeners} className="cursor-grab absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200">
          ☰
        </button>
        <NextImage src={getPublicUrl(image.storage_path)} alt={image.alt_text} width={80} height={80} className="object-cover ml-10" />
      </td>
      <td className="py-2 px-4 border-b">{image.alt_text}</td>
      <td className="py-2 px-4 border-b">{image.position}</td>
      <td className="py-2 px-4 border-b">{image.display_style}</td>
      <td className="py-2 px-4 border-b">
        <button
          onClick={() => startEditing(image)}
          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(image.id, image.storage_path)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function ImageAdminClientPage({ initialImages }: ImageAdminClientPageProps) {
  const [images, setImages] = useState<Image[]>(initialImages);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newAltText, setNewAltText] = useState('');
  const [newDisplayStyle, setNewDisplayStyle] = useState('');

  // Form states for editing image
  const [editAltText, setEditAltText] = useState('');
  const [editDisplayStyle, setEditDisplayStyle] = useState('');
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);

      const newImages = arrayMove(images, oldIndex, newIndex);

      // Update local state immediately for a smooth UI
      setImages(newImages);

      // Prepare data for server update with new positions
      const imagesToUpdate = newImages.map((img, index) => ({
        id: img.id,
        position: index, // Assign new position based on array index
      }));

      // Call server action to update positions in DB
      const result = await updateImagePositions(imagesToUpdate);
      if (result.error) {
        alert('Error updating image positions: ' + result.error);
        // Revert to original state if server update fails
        setImages(images);
      }
    }
  };

  // Helper function for array reordering
  const arrayMove = (array: Image[], oldIndex: number, newIndex: number) => {
    const newArray = [...array];
    const [removed] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, removed);
    return newArray;
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFile) return;

    const formData = new FormData();
    formData.append('file', newFile);
    formData.append('altText', newAltText);
    formData.append('displayStyle', newDisplayStyle);

    const result = await uploadImage(formData);
    if (result.success && result.image) {
      setImages((prev) => [...prev, result.image]);
      // Clear form
      setNewFile(null);
      setNewAltText('');
      setNewDisplayStyle('');
      setShowUploadForm(false);
    } else if (result.error) {
      alert(result.error);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    const formData = new FormData();
    formData.append('id', editingImage.id);
    formData.append('altText', editAltText);
    formData.append('displayStyle', editDisplayStyle);

    const result = await updateImage(formData);
    if (result.success && result.image) {
      setImages((prev) =>
        prev.map((img) => (img.id === result.image?.id ? result.image : img))
      );
      setEditingImage(null); // Exit edit mode
    } else if (result.error) {
      alert(result.error);
    }
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const result = await deleteImage(id, storagePath);
      if (result.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else if (result.error) {
        alert(result.error);
      }
    }
  };

  const startEditing = (image: Image) => {
    setEditingImage(image);
    setEditAltText(image.alt_text);
    setEditDisplayStyle(image.display_style);
  };

  // Helper to get public URL for Supabase storage
  // This assumes your Supabase project URL and bucket name 'images'
  const getPublicUrl = (storagePath: string) => {
    const cleanedPath = storagePath.startsWith('/') ? storagePath.substring(1) : storagePath;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${cleanedPath}`;
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          ← Retour
        </button>
        <h1 className="text-3xl font-bold mb-6">Image Administration</h1>

      <button
        onClick={() => setShowUploadForm(!showUploadForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showUploadForm ? 'Hide Upload Form' : 'Add New Image'}
      </button>

      {showUploadForm && (
        <form onSubmit={handleUploadSubmit} className="mb-8 p-4 border rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Upload New Image</h2>
          <div className="mb-2">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setNewFile(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="altText" className="block text-sm font-medium text-gray-700">Alt Text</label>
            <input
              type="text"
              id="altText"
              value={newAltText}
              onChange={(e) => setNewAltText(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="displayStyle" className="block text-sm font-medium text-gray-700">Display Style</label>
            <select
              id="displayStyle"
              value={newDisplayStyle}
              onChange={(e) => setNewDisplayStyle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select a style</option>
              <option value="standard">Standard</option>
              <option value="thumbnail">Thumbnail</option>
              <option value="fullscreen">Fullscreen</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>
          
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Upload Image</button>
        </form>
      )}

      <h2 className="text-xl font-semibold mb-2">Existing Images</h2>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={images.map(img => img.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Alt Text</th>
                  <th className="py-2 px-4 border-b">Position</th>
                  <th className="py-2 px-4 border-b">Display Style</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {images.map((image) => (
                  <SortableImageRow
                    key={image.id}
                    image={image}
                    getPublicUrl={getPublicUrl}
                    startEditing={startEditing}
                    handleDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </SortableContext>
      </DndContext>

      {editingImage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleUpdateSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Edit Image</h2>
            <div className="mb-2">
              <label htmlFor="editAltText" className="block text-sm font-medium text-gray-700">Alt Text</label>
              <input
                type="text"
                id="editAltText"
                value={editAltText}
                onChange={(e) => setEditAltText(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="editDisplayStyle" className="block text-sm font-medium text-gray-700">Display Style</label>
              <select
                id="editDisplayStyle"
                value={editDisplayStyle}
                onChange={(e) => setEditDisplayStyle(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select a style</option>
                <option value="standard">Standard</option>
                <option value="thumbnail">Thumbnail</option>
                <option value="fullscreen">Fullscreen</option>
                <option value="carousel">Carousel</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingImage(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Image
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  </div>
  );
}
