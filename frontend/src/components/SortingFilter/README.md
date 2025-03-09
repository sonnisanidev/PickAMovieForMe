# Sorting Filter Component

A reusable component that provides sorting options for movie lists, allowing users to sort movies by popularity, rating, and release date.

## Features

- Multiple sorting options:
  - Most/Least Popular
  - Highest/Lowest Rated
  - Newest/Oldest
- Dark/Light mode theming support
- Responsive design
- URL parameter integration

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| selectedSort | string | 'popularity.desc' | Currently selected sort option |
| onSortChange | function | required | Callback function called when sort option changes |

## Usage

```jsx
import SortingFilter from '../SortingFilter/SortingFilter';

const MovieBrowser = () => {
  const [selectedSort, setSelectedSort] = useState('popularity.desc');

  return (
    <SortingFilter
      selectedSort={selectedSort}
      onSortChange={setSelectedSort}
    />
  );
};
```

## Sort Options

| Value | Description |
|-------|-------------|
| popularity.desc | Most Popular |
| popularity.asc | Least Popular |
| vote_average.desc | Highest Rated |
| vote_average.asc | Lowest Rated |
| release_date.desc | Newest First |
| release_date.asc | Oldest First |

## Dependencies

- Tailwind CSS: For styling
- React: For component rendering
