
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ShareButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label?: string;
  className?: string;
  color?: string;
  bgColor?: string;
}

export function ShareButton({ 
  icon: Icon, 
  onClick, 
  label, 
  className = "h-8 w-8 rounded-full bg-white hover:bg-gray-100",
  color,
  bgColor
}: ShareButtonProps) {
  return (
    <Button 
      variant="outline" 
      size="icon" 
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: bgColor || '',
        color: color || '',
        borderColor: bgColor ? 'transparent' : ''
      }}
    >
      <Icon className="h-4 w-4" />
      {label && <span className="text-xs ml-1">{label}</span>}
    </Button>
  );
}
