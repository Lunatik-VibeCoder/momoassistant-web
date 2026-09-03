import { ButtonLink } from "@/components/shared/button-link";
import type { ReportsContent } from "@/content/reports";
import {
  buildReportsHref,
  popCursorForPreviousPage,
  pushCursorForNextPage,
  type ReportsSearchParams,
} from "@/lib/reports-query";

interface PaginationControlsProps {
  content: ReportsContent["table"];
  searchParams: ReportsSearchParams;
  nextCursor: string | null;
}

// WS-013 Phase 8 -- WS-011 CONTRACT.md §7.4: cursor-based, forward-only from
// the backend. "Next" only renders when the backend actually returned a
// nextCursor (never fabricated). "Previous" is reconstructed from the
// `before` stack this page has already visited (lib/reports-query.ts) --
// hidden entirely on page 1, since there is genuinely nothing to go back
// to. No offset is ever assumed anywhere in this component.
export function PaginationControls({ content, searchParams, nextCursor }: PaginationControlsProps) {
  const previous = popCursorForPreviousPage(searchParams.before);
  const hasNext = nextCursor !== null;

  if (!previous && !hasNext) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      {previous ? (
        <ButtonLink
          href={buildReportsHref(searchParams, { cursor: previous.cursor, before: previous.before })}
          variant="outline"
          size="sm"
        >
          {content.previousPage}
        </ButtonLink>
      ) : (
        <span />
      )}
      {hasNext ? (
        <ButtonLink
          href={buildReportsHref(
            searchParams,
            pushCursorForNextPage(searchParams.cursor, searchParams.before, nextCursor as string),
          )}
          variant="outline"
          size="sm"
        >
          {content.nextPage}
        </ButtonLink>
      ) : (
        <span />
      )}
    </div>
  );
}
