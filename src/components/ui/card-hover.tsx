import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardHoverProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

const CardHover: React.FC<CardHoverProps> = ({ 
  title, 
  description, 
  children, 
  className,
  gradient = false 
}) => {
  return (
    <Card className={cn(
      "hover-lift transition-smooth border-border/50 overflow-hidden",
      gradient ? "card-gradient" : "",
      className
    )}>
      {title && (
        <CardHeader>
          <CardTitle className="font-playfair">{title}</CardTitle>
          {description && (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardHover;