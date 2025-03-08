import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Generates a set of class names for button components based on variant and size options.
 * 
 * @param baseClassNames - The base class names applied to all button variants.
 * @param options - An object containing variant and size options.
 * @param options.variants - An object defining different styles for button variants.
 * @param options.variants.variant - Defines the style for different button variants:
 *   - `default`: Primary button style.
 *   - `destructive`: Destructive action button style.
 *   - `outline`: Outlined button style.
 *   - `secondary`: Secondary button style.
 *   - `ghost`: Ghost button style.
 *   - `link`: Link button style.
 * @param options.variants.size - Defines the size for different button variants:
 *   - `default`: Default button size.
 *   - `sm`: Small button size.
 *   - `lg`: Large button size.
 *   - `icon`: Icon button size.
 * @param options.defaultVariants - An object defining the default variant and size.
 * @param options.defaultVariants.variant - The default button variant.
 * @param options.defaultVariants.size - The default button size.
 * 
 * @returns A string of class names based on the provided variant and size.
 */
const buttonVariants = cva(
  'inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
