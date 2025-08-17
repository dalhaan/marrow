import React, { useId, useLayoutEffect, useRef, useState } from "react";

export const Skeleton = ({
  className,
  isLoading = true,
  maxDepth = Infinity,
  minDepth = 0,
  foregroundColor = "#AAA",
  backgroundColor = "#CCC",
  shouldAnimate = true,
  children,
}: {
  className?: string;
  isLoading?: boolean;
  maxDepth?: number;
  minDepth?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  shouldAnimate?: boolean;
  children: React.ReactNode;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [Loader, setLoader] = useState<React.ReactNode>(null);
  const id = useId();
  const clipId = `clip-${id}`;
  const gradientId = `gradient-${id}`;
  const gradientRatio = 2;
  const from = `${gradientRatio * -1} 0`;
  const to = `${gradientRatio} 0`;
  const duration = `${1.2}s`;

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

      if (
        currentDepth > maxDepth ||
        currentDepth < minDepth ||
        !(node instanceof HTMLElement)
      ) {
        continue;
      }

      // should render node
      const nodeStyle = window.getComputedStyle(node);
      const hasTextContent = Array.from(node.childNodes).some(
        (child) => child.nodeType === Node.TEXT_NODE,
      );
      const hasBackground = nodeStyle.backgroundColor !== "rgba(0, 0, 0, 0)";

      console.log(node, {
        text: node.innerText,
        hasTextContent,
        hasBackground,
        nodeType: node.nodeType,
        children: node.childNodes,
      });

      if (!hasTextContent && !hasBackground) {
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
        className={className}
        width={rootBoundingBox.width}
        height={rootBoundingBox.height}
        viewBox={`0 0 ${rootBoundingBox.width} ${rootBoundingBox.height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={clipId}>
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

            <linearGradient
              id={gradientId}
              gradientTransform={`translate(${from})`}
            >
              <stop offset="0%" stopColor={backgroundColor} stopOpacity={1} />

              <stop offset="50%" stopColor={foregroundColor} stopOpacity={1} />

              <stop offset="100%" stopColor={backgroundColor} stopOpacity={1} />

              {shouldAnimate && (
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values={`${from}; 0 0; ${to}`}
                  dur={duration}
                  repeatCount="indefinite"
                />
              )}
            </linearGradient>
          </clipPath>
        </defs>
        <rect
          role="presentation"
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath={`url(#${clipId})`}
          style={{ fill: `url(#${gradientId})` }}
        />
      </svg>,
    );
  }, []);

  return <div ref={container}>{isLoading && Loader ? Loader : children}</div>;
};
