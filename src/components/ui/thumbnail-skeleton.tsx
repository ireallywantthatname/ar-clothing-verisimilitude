import { Skeleton } from "@/components/ui/skeleton"

interface ThumbnailSkeletonProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ThumbnailSkeleton({
  size = "md",
  className = ""
}: ThumbnailSkeletonProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  }

  return (
    <Skeleton
      className={`${sizeClasses[size]} rounded-lg ${className}`}
    />
  )
}
