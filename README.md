# React Skeleton

A lightweight, customizable skeleton loader component for React applications.

## Installation

```bash
npm install marrow
# or
yarn add marrow
# or
pnpm add marrow
```

## Usage

```jsx
import { Skeleton } from "marrow";

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

## Props

| Prop        | Type      | Default    | Description                                             |
| ----------- | --------- | ---------- | ------------------------------------------------------- |
| `isLoading` | boolean   | -          | When true, renders skeleton loaders instead of children |
| `maxDepth`  | number    | `Infinity` | Maximum depth of DOM tree to generate skeletons for     |
| `children`  | ReactNode | -          | Content to render when not loading                      |

## Features

- Automatically generates skeleton loaders based on your actual content
- Preserves the layout and dimensions of your components
- Customizable depth to control skeleton generation
- Zero dependencies
- TypeScript support

## License

MIT © [Dallan Freemantle](https://github.com/dalhaan)
