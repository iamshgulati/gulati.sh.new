import React from "react";
import { usePathname } from "next/navigation";

type ScrollState = "at-top" | "scrolling-down" | "scrolling-up";

/**
 * Custom React hook to track the scroll state.
 * @param [viewportScrollFactorThreshold = 1] - Minimum height of document expressed as factor of viewport height.
 * @param [scrollDistanceThreshold = 0] - The delay in pixels before considering a scroll action.
 * @returns {ScrollState} Returns the current scroll state: 'at-top', 'scrolling-up', or 'scrolling-down'.
 */
export function useScrollState(
  viewportScrollFactorThreshold = 1,
  scrollDistanceThreshold = 0,
): ScrollState {
  const [scrollState, setScrollState] = React.useState<ScrollState>("at-top");
  const [previousScrollPosition, setPreviousScrollPosition] =
    React.useState<number>(0);
  const pathname = usePathname();

  const handleScroll = React.useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const viewportScrollFactor = totalHeight / viewportHeight;

    if (viewportScrollFactor >= viewportScrollFactorThreshold) {
      const currentScrollPosition = window.scrollY;

      const hasScrolledPastThreshold =
        Math.abs(currentScrollPosition - previousScrollPosition) >
        scrollDistanceThreshold;

      if (hasScrolledPastThreshold) {
        const scrollDirection =
          previousScrollPosition < currentScrollPosition
            ? "scrolling-down"
            : "scrolling-up";
        const newScrollState =
          currentScrollPosition <= scrollDistanceThreshold
            ? "at-top"
            : scrollDirection;
        setPreviousScrollPosition(currentScrollPosition);
        setScrollState(newScrollState);
      }
    }
  }, [
    previousScrollPosition,
    scrollDistanceThreshold,
    viewportScrollFactorThreshold,
  ]);

  React.useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  React.useEffect(() => {
    setScrollState("at-top");
  }, [pathname]);

  return scrollState;
}