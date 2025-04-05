import { useEffect } from "react";

/**
 * This component programmatically removes the Replit badge
 * that appears in the bottom right of the page.
 */
export default function ReplitRemover() {
  useEffect(() => {
    // Function to remove Replit-related elements
    const removeReplitElements = () => {
      // Find and remove elements with specific Replit-related attributes
      const selectors = [
        'a[href*="replit.com"]',
        '.cartographer',
        'a[aria-label="Made with Replit"]',
        'a[href^="https://replit.com/@teams"]',
        '[data-replit-mode="true"]',
        'iframe[src*="replit.com"]',
        'div[style*="position: fixed; bottom: 0px; right: 0px;"]',
        'div[style*="z-index: 2147483647;"]',
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.remove();
        });
      });

      // Specific targeting for the fixed positioned element
      const allElements = document.querySelectorAll('div');
      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (
          (style.position === 'fixed' && style.bottom === '0px' && style.right === '0px') ||
          (style.position === 'fixed' && style.bottom === '8px' && style.right === '8px') ||
          Number(style.zIndex) > 1000000
        ) {
          el.remove();
        }
      });
    };

    // Call immediately
    removeReplitElements();

    // Set up mutation observer to watch for dynamically added elements
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          removeReplitElements();
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  // This component doesn't render anything
  return null;
}