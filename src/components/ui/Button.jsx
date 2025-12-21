import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200  disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'hover:opacity-90 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 bg-transparent hover:bg-opacity-10 focus:ring-blue-500',
      },
      size: {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const Button = ({
  // Required parameters with defaults
  text = "",
  text_font_size = "text-lg",
  text_font_family = "Poppins",
  text_font_weight = "font-normal",
  text_line_height = "14px",
  text_text_align = "left",
  text_color = "#1e0e06e5",
  fill_background_color = "bg-background-card",
  border_border_radius = "rounded-md rounded-xl rounded-md rounded-xl",

  // Optional parameters (no defaults)
  effect_box_shadow,
  border_border,
  layout_align_self,
  border_border_left,
  layout_gap,
  layout_width,
  padding,
  position,
  margin,

  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = "button",
  leftImage,
  ...props
}) => {
  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';
  const hasValidBoxShadow = effect_box_shadow && typeof effect_box_shadow === 'string' && effect_box_shadow?.trim() !== '';
  const hasValidBorder = border_border && typeof border_border === 'string' && border_border?.trim() !== '';
  const hasValidAlignSelf = layout_align_self && typeof layout_align_self === 'string' && layout_align_self?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidMargin ? `m-[${margin}]` : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
    hasValidBoxShadow ? `shadow-[${effect_box_shadow}]` : '',
    hasValidBorder ? `border-[${border_border}]` : '',
    hasValidAlignSelf ? `self-${layout_align_self}` : '',
  ]?.filter(Boolean)?.join(' ');

  // Build inline styles for required parameters
  const buttonStyles = {
    fontSize: text_font_size === "text-lg" ? "14px" : text_font_size,
    fontFamily: text_font_family || 'Helvetica Neue',
    fontWeight: text_font_weight === "font-normal" ? "400" : text_font_weight,
    lineHeight: text_line_height || "14px",
    textAlign: text_text_align || 'left',
    color: text_color || "#1e0e06e5",
    backgroundColor: fill_background_color === "bg-background-card" ? "#ffffff" : fill_background_color,
    borderRadius: border_border_radius || "6px 12px 6px 12px",
  };

  // Safe click handler
  const handleClick = (event) => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={buttonStyles}
      className={twMerge(
        buttonClasses({ variant, size }),
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {leftImage && (
        <img
          src={leftImage?.src}
          alt=""
          className="w-[14px] h-[14px] mr-1"
        />
      )}
      {children || text}
    </button>
  );
};

export default Button;