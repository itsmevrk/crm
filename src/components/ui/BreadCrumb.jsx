import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const breadcrumbClasses = cva(
  'flex items-center text-sm',
  {
    variants: {
      variant: {
        default: 'text-gray-600',
        dark: 'text-gray-800',
        light: 'text-gray-400',
      },
      size: {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const BreadCrumb = ({
  // Optional parameters (no defaults)
  layout_gap,
  layout_justify_content,
  layout_align_items,
  layout_width,
  position,
  
  // Standard React props
  variant,
  size,
  items = [],
  separator = "/",
  className,
  onItemClick,
  ...props
}) => {
  // Safe validation for optional parameters
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';
  const hasValidJustifyContent = layout_justify_content && typeof layout_justify_content === 'string' && layout_justify_content?.trim() !== '';
  const hasValidAlignItems = layout_align_items && typeof layout_align_items === 'string' && layout_align_items?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Parse layout properties
  const parseJustifyContent = (justifyContent) => {
    const mapping = {
      'start': 'justify-start',
      'center': 'justify-center',
      'end': 'justify-end',
      'spaceBetween': 'justify-between',
      'spaceAround': 'justify-around',
      'spaceEvenly': 'justify-evenly'
    };
    return mapping?.[justifyContent] || 'justify-start';
  };

  const parseAlignItems = (alignItems) => {
    const mapping = {
      'start': 'items-start',
      'center': 'items-center',
      'end': 'items-end',
      'stretch': 'items-stretch',
      'baseline': 'items-baseline'
    };
    return mapping?.[alignItems] || 'items-center';
  };

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidGap ? (layout_gap?.includes('px') ? `gap-[${layout_gap}]` : `gap-${layout_gap}`) : 'gap-2',
    hasValidJustifyContent ? parseJustifyContent(layout_justify_content) : 'justify-start',
    hasValidAlignItems ? parseAlignItems(layout_align_items) : 'items-center',
    hasValidWidth ? (layout_width === 'auto' ? 'w-auto' : `w-[${layout_width}]`) : 'w-auto',
    hasValidPosition ? position : '',
  ]?.filter(Boolean)?.join(' ');

  // Default items if none provided (from JSON analysis)
  const defaultItems = items?.length > 0 ? items : [
    { label: 'Main', href: '/', isActive: false },
    { label: 'Dashboard', href: '/dashboard', isActive: true }
  ];

  const handleItemClick = (item, index) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  return (
    <nav
      className={twMerge(
        breadcrumbClasses({ variant, size }),
        optionalClasses,
        className
      )}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {defaultItems?.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400 select-none" aria-hidden="true">
                {separator}
              </span>
            )}
            
            {item?.isActive ? (
              <span 
                className="font-medium text-gray-900 cursor-default"
                aria-current="page"
              >
                {item?.label}
              </span>
            ) : (
              <button
                onClick={() => handleItemClick(item, index)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-150 focus:outline-none focus:underline"
                type="button"
              >
                {item?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;