import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const dropdownClasses = cva(
  'relative inline-flex items-center justify-between cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border border-gray-300 hover:border-gray-400',
        filled: 'bg-gray-50 border border-gray-200',
        outline: 'border-2 border-blue-500',
      },
      size: {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const Dropdown = ({
  // Required parameters with defaults
  placeholder = "Kamalesh",
  text_font_size = "text-xl",
  text_font_family = "Poppins",
  text_font_weight = "font-medium",
  text_line_height = "16px",
  text_text_align = "left",
  text_color = "#1e0e06",

  // Optional parameters (no defaults)
  layout_gap,
  layout_width,
  padding,
  position,

  // Standard React props
  variant,
  size,
  options = [],
  value,
  onChange,
  disabled = false,
  className,
  rightImage,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || placeholder);
  const dropdownRef = useRef(null);

  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
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
      switch (side) {
        case 't': classes += ` pt-[${numValue}px]`; break;
        case 'r': classes += ` pr-[${numValue}px]`; break;
        case 'b': classes += ` pb-[${numValue}px]`; break;
        case 'l': classes += ` pl-[${numValue}px]`; break;
      }
    });
    return classes?.trim();
  };

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? (layout_width === 'flex-1' ? 'flex-1' : `w-[${layout_width}]`) : '',
    hasValidPadding ? parsePadding(padding) : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ]?.filter(Boolean)?.join(' ');

  // Build inline styles for required parameters
  const dropdownStyles = {
    fontSize: text_font_size === "text-xl" ? "16px" : text_font_size,
    fontFamily: text_font_family || 'Helvetica Neue',
    fontWeight: text_font_weight === "font-medium" ? "500" : text_font_weight,
    lineHeight: text_line_height || "16px",
    textAlign: text_text_align || 'left',
    color: text_color || "#1e0e06",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedValue(option?.label || option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className={twMerge(
          dropdownClasses({ variant, size }),
          optionalClasses,
          className
        )}
        style={dropdownStyles}
        onClick={toggleDropdown}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e?.key === 'Enter' || e?.key === ' ') {
            e?.preventDefault();
            toggleDropdown();
          }
        }}
        {...props}
      >
        <span className="truncate">{selectedValue}</span>
        {rightImage && (
          <img
            src={rightImage?.src}
            alt=""
            className={`w-[20px] h-[20px] ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
              }`}
          />
        )}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {options?.length > 0 ? (
            options?.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                onClick={() => handleSelect(option)}
                style={{
                  fontSize: dropdownStyles?.fontSize,
                  fontFamily: dropdownStyles?.fontFamily,
                }}
              >
                {option?.label || option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;