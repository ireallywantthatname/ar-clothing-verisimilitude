import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductSkeletonProps {
  showActions?: boolean
}

export function ProductSkeleton({ showActions = false }: ProductSkeletonProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Skeleton className="w-full h-full" />

        {showActions && (
          <div className="absolute top-4 right-4 space-y-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/3" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-3 h-3" />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} showActions />
      ))}
    </div>
  )
}
