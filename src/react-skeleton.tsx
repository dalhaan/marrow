import React, { useLayoutEffect, useRef, useState } from "react";

export const Skeleton = ({
  isLoading = true,
  maxDepth = Infinity,
  minDepth = 0,
  children,
  ...props
}: {
  isLoading?: boolean;
  maxDepth?: number;
  minDepth?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const container = useRef<HTMLDivElement>(null);
  const [Loader, setLoader] = useState<React.ReactNode>(null);

  useLayoutEffect(() => {
    const rootBoundingBox = container.current!.getBoundingClientRect();

    const childrenNodes: {
      boundingBox: { top: number; left: number; width: number; height: number };
      depth: number;
    }[] = [];

    const walker = document.createTreeWalker(
      container.current!,
      NodeFilter.SHOW_ELEMENT,
    );

    let currentDepth = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode;

      let parent = node.parentNode;
      currentDepth = 0;

      while (parent && parent !== container.current) {
        currentDepth++;
        parent = parent.parentNode;
      }

      if (currentDepth > maxDepth || currentDepth < minDepth) {
        continue;
      }

      const boundingBox = (node as HTMLElement).getBoundingClientRect();
      const elementBoundingBox = {
        top: boundingBox.top - rootBoundingBox.top,
        left: boundingBox.left - rootBoundingBox.left,
        width: boundingBox.width,
        height: boundingBox.height,
      };

      childrenNodes.push({
        boundingBox: elementBoundingBox,
        depth: currentDepth,
      });
    }

    setLoader(
      <svg
        width={rootBoundingBox.width}
        height={rootBoundingBox.height}
        viewBox={`0 0 ${rootBoundingBox.width} ${rootBoundingBox.height}`}
      >
        <defs>
          <linearGradient
            id="logo-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#7A5FFF">
              <animate
                attributeName="stop-color"
                values="#7A5FFF; #01FF89; #7A5FFF"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>

            <stop offset="100%" stop-color="#01FF89">
              <animate
                attributeName="stop-color"
                values="#01FF89; #7A5FFF; #01FF89"
                dur="4s"
                repeatCount="indefinite"
              ></animate>
            </stop>
          </linearGradient>
        </defs>

        {childrenNodes.map((node) => (
          <rect
            x={node.boundingBox.left}
            y={node.boundingBox.top}
            rx={15}
            ry={15}
            width={node.boundingBox.width}
            height={node.boundingBox.height}
            fill="url('#logo-gradient')"
            opacity={0.2}
          />
        ))}
      </svg>,
    );
  }, []);

  return (
    <div ref={container} {...props}>
      {isLoading && Loader ? Loader : children}
    </div>
  );
};
