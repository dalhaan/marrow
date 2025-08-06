import React, { useLayoutEffect, useRef, useState } from "react";

export const Skeleton = ({
  isLoading,
  maxDepth = Infinity,
  children,
  ...props
}: {
  isLoading: boolean;
  maxDepth?: number;
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

      if (currentDepth > maxDepth) {
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
        {childrenNodes.map((node) => (
          <rect
            x={node.boundingBox.left}
            y={node.boundingBox.top}
            rx={10}
            ry={10}
            width={node.boundingBox.width}
            height={node.boundingBox.height}
            fill="#ccc"
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
