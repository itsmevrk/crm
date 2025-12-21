import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const seekBarClasses = cva(
  'relative w-full h-2 rounded-full cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-200',
        primary: 'bg-blue-100',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        danger: 'bg-red-100',
      },
      size: {
        small: 'h-1',
        medium: 'h-2',
        large: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const SeekBar = ({
  // Required parameters with defaults
  fill_background_color = "#ffa80063",
  border_border_radius = "rounded-sm",
  
  // Optional parameters (no defaults)
  layout_width,
  margin,
  position,
  
  // Standard React props
  variant,
  size,
  min = 0,
  max = 100,
  value = 0,
  step = 1,
  onChange,
  onChangeEnd,
  disabled = false,
  className,
  showValue = false,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const seekBarRef = useRef(null);

  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Parse margin values
  const parseMargin = (marginStr) => {
    if (!marginStr) return '';
    const parts = marginStr?.split(',');
    let classes = '';
    parts?.forEach(part => {
      const [side, value] = part?.split('=');
      const numValue = value?.replace('px', '');
      switch(side) {
        case 't': classes += ` mt-[${numValue}px]`; break;
        case 'r': classes += ` mr-[${numValue}px]`; break;
        case 'b': classes += ` mb-[${numValue}px]`; break;
        case 'l': classes += ` ml-[${numValue}px]`; break;
      }
    });
    return classes?.trim();
  };

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? (layout_width === 'optional' ? 'w-full' : `w-[${layout_width}]`) : 'w-full',
    hasValidMargin ? parseMargin(margin) : '',
    hasValidPosition ? position : '',
  ]?.filter(Boolean)?.join(' ');

  // Calculate percentage
  const percentage = ((currentValue - min) / (max - min)) * 100;

  // Handle mouse/touch events
  const updateValue = (clientX) => {
    if (!seekBarRef?.current || disabled) return;

    const rect = seekBarRef?.current?.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect?.left) / rect?.width) * 100));
    let newValue = Math.round(((percentage / 100) * (max - min) + min) / step) * step;
    
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e?.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging && !disabled) {
      updateValue(e?.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onChangeEnd) onChangeEnd(currentValue);
    }
  };

  // Touch events
  const handleTouchStart = (e) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e?.touches?.[0]?.clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging && !disabled) {
      updateValue(e?.touches?.[0]?.clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onChangeEnd) onChangeEnd(currentValue);
    }
  };

  // Keyboard support
  const handleKeyDown = (e) => {
    if (disabled) return;
    
    let newValue = currentValue;
    switch (e?.key) {
      case 'ArrowLeft': case'ArrowDown':
        newValue = Math.max(min, currentValue - step);
        break;
      case 'ArrowRight': case'ArrowUp':
        newValue = Math.min(max, currentValue + step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    
    e?.preventDefault();
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  // Global mouse events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div className={twMerge(optionalClasses, 'relative')}>
      <div
        ref={seekBarRef}
        className={twMerge(
          seekBarClasses({ variant, size }),
          className,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        style={{
          borderRadius: border_border_radius === "rounded-sm" ? "3px" : border_border_radius,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-disabled={disabled}
        {...props}
      >
        {/* Progress fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-150"
          style={{
            width: `${percentage}%`,
            backgroundColor: fill_background_color === "#ffa80063" ? "#ffa80063" : fill_background_color,
            borderRadius: border_border_radius === "rounded-sm" ? "3px" : border_border_radius,
          }}
        />
        
        {/* Thumb */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full shadow-sm transition-all duration-150 hover:scale-110 focus:scale-110"
          style={{
            left: `calc(${percentage}% - 8px)`,
            borderColor: disabled ? '#d1d5db' : '#6b7280',
          }}
        />
      </div>
      
      {/* Value display */}
      {showValue && (
        <div className="mt-2 text-sm text-center text-gray-600">
          {currentValue}
        </div>
      )}
    </div>
  );
};

export default SeekBar;