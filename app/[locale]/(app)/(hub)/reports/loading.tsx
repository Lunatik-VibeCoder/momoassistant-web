import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/layout/section";

// WS-013 Phase 10 -- Next's file-based Suspense boundary: automatically
// shown during the server-render fetch for any navigation into/within
// /reports (period switch, filter submit, pagination). No new spinner/
// skeleton library -- reuses the existing Card primitive and Tailwind's
// built-in animate-pulse, same tokens as the rest of the Hub.
function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className ?? ""}`} />;
}

export default function ReportsLoading() {
  return (
    <Section className="pt-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <SkeletonBlock className="h-6 w-32" />
          <SkeletonBlock className="h-4 w-64" />
        </div>

        <SkeletonBlock className="h-8 w-72" />

        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-24" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-12" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-40" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SkeletonBlock className="h-24" />
              <SkeletonBlock className="h-24" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-48" />
          </CardHeader>
          <CardContent>
            <SkeletonBlock className="h-24" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <SkeletonBlock className="h-64" />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
