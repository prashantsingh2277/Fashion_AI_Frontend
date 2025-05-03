
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import service from '@/services/config';

interface GalleryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  userId: string;
  userName: string;
  likes: number;
  userLiked: boolean;
}

export function useGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'masonry'>('grid');
  const { user } = useAuth();
  
  useEffect(() => {
    // Load gallery items
    const loadGallery = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await service.getAllPosts();
        
        if (response && response.documents) {
          const items = response.documents.map((doc: any) => ({
            id: doc.$id,
            imageUrl: doc.imageUrl,
            prompt: doc.prompt,
            createdAt: doc.createdAt,
            userId: doc.userId,
            userName: 'User', // In a real app, you'd fetch user names
            likes: doc.likes || 0,
            userLiked: false // In a real app, you'd check if current user liked this
          }));
          
          setGalleryItems(items);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load gallery items:', error);
        toast.error('Failed to load gallery items');
        setIsLoading(false);
      }
    };
    
    loadGallery();
  }, [user]);
  
  const handleLike = async (itemId: string) => {
    if (!user) {
      toast.error('Please log in to like designs');
      return;
    }
    
    try {
      await service.likePost(itemId);
      
      setGalleryItems(prevItems => {
        return prevItems.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              likes: item.likes + 1,
              userLiked: true
            };
          }
          return item;
        });
      });
      
      toast.success('Design liked!');
    } catch (error) {
      console.error('Failed to like post:', error);
      toast.error('Failed to like design');
    }
  };
  
  const handleAddToGallery = async (design: any) => {
    if (!user) {
      toast.error('Please log in to save designs');
      return;
    }
    
    try {
      // Create post for this design
      await service.createPost({
        title: design.title || 'My Design',
        prompt: design.prompt,
        imageUrl: design.imageUrl,
        userId: user.id
      });
      
      toast.success('Design added to your collection');
    } catch (error) {
      console.error('Failed to add design to collection:', error);
      toast.error('Failed to save design');
    }
  };

  return {
    galleryItems,
    isLoading,
    layout,
    setLayout,
    handleLike,
    handleAddToGallery
  };
}
