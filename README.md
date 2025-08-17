# React Marrow

A lightweight, customizable skeleton loader component for React applications.

## Installation

```bash
npm install react-marrow
# or
yarn add react-marrow
# or
pnpm add react-marrow
```

## Usage

```jsx
import { Skeleton } from "react-marrow";
import { useEffect, useState } from "react";

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Skeleton isLoading={isLoading} maxDepth={2}>
      <div className="content">
        <h1>My Content</h1>
        <p>This content will be replaced by skeleton loaders while loading</p>
        <button>Click me</button>
      </div>
    </Skeleton>
  );
}
```

### Advanced usage

```jsx
<Skeleton
  className="my-skeleton"
  isLoading
  minDepth={0}
  maxDepth={3}
  foregroundColor="#BDBDBD"
  backgroundColor="#E0E0E0"
  shouldAnimate
>
  {children}
</Skeleton>
```

## Props

| Prop              | Type           | Default    | Description                                                |
| ----------------- | -------------- | ---------- | ---------------------------------------------------------- |
| `className`       | string         | -          | Optional className applied to the internal `<svg>` wrapper |
| `isLoading`       | boolean        | `true`     | When true, renders skeleton loaders instead of `children`  |
| `maxDepth`        | number         | `Infinity` | Maximum DOM depth to generate skeletons for                |
| `minDepth`        | number         | `0`        | Minimum DOM depth to start generating skeletons            |
| `foregroundColor` | string (color) | `"#AAA"`   | Color of the moving gradient                               |
| `backgroundColor` | string (color) | `"#CCC"`   | Base color of the skeleton background                      |
| `shouldAnimate`   | boolean        | `true`     | Toggle the shimmer animation                               |
| `children`        | ReactNode      | -          | Content to render when not loading                         |

## Features

- Automatically generates skeleton loaders based on your actual content
- Preserves the layout and dimensions of your components
- Customizable depth to control skeleton generation
- Zero dependencies
- TypeScript support

## License

MIT © [Dallan Freemantle](https://github.com/dalhaan)
