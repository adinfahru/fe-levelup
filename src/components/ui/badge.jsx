import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-800 text-white border-transparent hover:bg-indigo-700",
        secondary:
          "bg-gray-700 text-white border-transparent hover:bg-gray-600",
        outline:
          "text-gray-800 border-gray-300 hover:bg-gray-100",
        success:
          "bg-green-600 text-white border-transparent hover:bg-green-500",
        destructive:
          "bg-red-600 text-white border-transparent hover:bg-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
