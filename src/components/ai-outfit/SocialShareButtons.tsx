import { toast } from 'sonner';
import {
  Share, Facebook, Instagram, SearchIcon,
  MessageCircle, ShoppingBag, Heart, Download
} from 'lucide-react';
import { ShareButton } from './ShareButton';

interface SocialShareButtonsProps {
  designId: string;
  imageUrl: string;
  onAddToGallery: () => void;
  liked: boolean;
  onLike: () => void;
  likesCount: number;
  generatedText: string;
}

export function SocialShareButtons({
  designId,
  imageUrl,
  onAddToGallery,
  liked,
  onLike,
  likesCount,
  generatedText,
}: SocialShareButtonsProps) {
  const handleShare = (platform: string) => {
    const shareUrl = `https://styleai.com/shared-design/${designId}`;

    let shareLink = '';
    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=Check out this AI-generated fashion design: ${shareUrl}`;
        break;
      case 'instagram':
        toast.info('Image saved. You can now share it on Instagram');
        return;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=Check out this AI-generated fashion design&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'myntra':
        navigateToMyntra(generatedText);
        return;
      case 'google':
        navigateToGoogleShopping(generatedText);
        return;
      default:
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank');
      toast.success(`Shared on ${platform}`);
    }
  };

  const navigateToMyntra = (searchText: string) => {
    const formattedText = searchText.toLowerCase().replace(/\s+/g, "-");
    const myntraUrl = `https://www.myntra.com/${formattedText}`;
    window.open(myntraUrl, '_blank'); // ✅ opens in new tab
  };

  const navigateToGoogleShopping = (searchText: string) => {
    const formattedText = encodeURIComponent(searchText);
    const googleShoppingUrl = `https://www.google.com/search?tbm=shop&q=${formattedText}`;
    window.open(googleShoppingUrl, '_blank'); // ✅ opens in new tab
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-outfit.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  };

  const handleAddToGallery = () => {
    const storedItems = localStorage.getItem('galleryItems');
    const galleryItems = storedItems ? JSON.parse(storedItems) : [];

    const designIndex = galleryItems.findIndex((item: any) => item.id === designId);

    if (designIndex >= 0) {
      galleryItems[designIndex].isShared = true;
      localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
      toast.success("Design shared to community gallery!");
    } else {
      toast.error("Could not find design to share.");
    }

    onAddToGallery();
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {/* WhatsApp */}
      <ShareButton
        icon={MessageCircle}
        onClick={() => handleShare('whatsapp')}
        className="h-8 w-8 rounded-full hover:opacity-90 transition-all"
        bgColor="#25D366"
        color="#ffffff"
      />

      {/* Instagram */}
      <ShareButton
        icon={Instagram}
        onClick={() => handleShare('instagram')}
        className="h-8 w-8 rounded-full hover:opacity-90 transition-all"
        bgColor="#E1306C"
        color="#ffffff"
      />

      {/* Facebook */}
      <ShareButton
        icon={Facebook}
        onClick={() => handleShare('facebook')}
        className="h-8 w-8 rounded-full hover:opacity-90 transition-all"
        bgColor="#3b5998"
        color="#ffffff"
      />

      {/* Twitter */}
      <ShareButton
        icon={Share}
        onClick={() => handleShare('twitter')}
        className="h-8 w-8 rounded-full hover:opacity-90 transition-all"
        bgColor="#1DA1F2"
        color="#ffffff"
      />

      {/* Myntra */}
      <ShareButton
        icon={ShoppingBag}
        onClick={() => handleShare('myntra')}
        className="h-8 w-8 rounded-full hover:opacity-90 transition-all"
        bgColor="#FB56C1"
        color="#ffffff"
      />

      {/* Google Shopping */}
      <ShareButton
        icon={SearchIcon}
        onClick={() => handleShare('google')}
        className="h-8 w-8 rounded-full hover:opacity-90 transition-all"
        bgColor="#4285F4"
        color="#ffffff"
      />

      {/* Download */}
      <ShareButton
        icon={Download}
        onClick={handleDownload}
        className="h-8 w-8 rounded-full hover:opacity-90 transition-all"
        bgColor="#4CAF50"
        color="#ffffff"
      />
    </div>
  );
}
