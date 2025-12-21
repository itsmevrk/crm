import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const searchViewClasses = cva(
  'flex items-center bg-transparent border rounded-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent',
  {
    variants: {
      variant: {
        default: 'border-gray-300',
        filled: 'bg-gray-50 border-gray-200',
        outline: 'border-2',
      },
      size: {
        small: 'text-sm px-3 py-2',
        medium: 'text-base px-4 py-2.5',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const SearchView = ({
  // Required parameters with defaults
  placeholder = "Search",
  text_font_size = "text-lg",
  text_font_family = "Poppins",
  text_font_weight = "font-medium",
  text_line_height = "21px",
  text_text_align = "left",
  text_color = "text-text-white",
  border_border = "1px solid #ffffff7f",
  border_border_radius = "rounded-xl",
  
  // Optional parameters (no defaults)
  layout_gap,
  layout_width,
  padding,
  margin,
  position,
  
  // Standard React props
  variant,
  size,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  className,
  leftImage,
  rightImage,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';

  // Parse padding values
  const parsePadding = (paddingStr) => {
    if (!paddingStr) return '';
    const parts = paddingStr?.split(',');
    let classes = '';
    parts?.forEach(part => {
      const [side, value] = part?.split('=');
      const numValue = value?.replace('px', '');
      switch(side) {
        case 't': classes += ` pt-[${numValue}px]`; break;
        case 'r': classes += ` pr-[${numValue}px]`; break;
        case 'b': classes += ` pb-[${numValue}px]`; break;
        case 'l': classes += ` pl-[${numValue}px]`; break;
      }
    });
    return classes?.trim();
  };

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
    hasValidWidth ? (layout_width === 'flex-1' ? 'flex-1' : `w-[${layout_width}]`) : '',
    hasValidPadding ? parsePadding(padding) : '',
    hasValidMargin ? parseMargin(margin) : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ]?.filter(Boolean)?.join(' ');

  // Build inline styles for required parameters
  const searchStyles = {
    fontSize: text_font_size === "text-lg" ? "14px" : text_font_size,
    fontFamily: text_font_family || 'Poppins',
    fontWeight: text_font_weight === "font-medium" ? "500" : text_font_weight,
    lineHeight: text_line_height || "21px",
    color: text_color === "text-text-white" ? "#ffffff" : text_color,
    border: border_border || "1px solid #ffffff7f",
    borderRadius: border_border_radius === "rounded-xl" ? "12px" : border_border_radius,
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div
      className={twMerge(
        searchViewClasses({ variant, size }),
        optionalClasses,
        className
      )}
      style={searchStyles}
    >
      {leftImage && (
        <img
          src={leftImage?.src}
          alt=""
          className="w-[20px] h-[20px] mr-2 flex-shrink-0"
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none placeholder-current"
        style={{
          fontSize: searchStyles?.fontSize,
          fontFamily: searchStyles?.fontFamily,
          fontWeight: searchStyles?.fontWeight,
          lineHeight: searchStyles?.lineHeight,
          color: searchStyles?.color,
        }}
        {...props}
      />
      {rightImage && (
        <img
          src={rightImage?.src}
          alt=""
          className="w-[20px] h-[20px] ml-2 flex-shrink-0"
        />
      )}
    </div>
  );
};

export default SearchView;