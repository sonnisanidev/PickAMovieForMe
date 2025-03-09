# Genre Filter Component

A reusable component that provides genre-based filtering for movie lists, with multi-select support and dark mode compatibility.

## Features

- Multi-select genre filtering
- React Query integration for genre data fetching
- Dark/Light mode theming support
- Responsive design
- URL parameter integration
- Disabled state when mood is selected

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| selectedGenres | array | [] | Array of currently selected genre names |
| onChange | function | required | Callback function called when genre selection changes |
| disabled | boolean | false | Disables the genre filter (used when mood is selected) |

## Usage

```jsx
import GenreFilter from '../GenreFilter/GenreFilter';

const MovieBrowser = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <GenreFilter
      selectedGenres={selectedGenres}
      onChange={setSelectedGenres}
      disabled={false}
    />
  );
};
```

## Dependencies

- React Query: For genre data fetching
- Tailwind CSS: For styling
- React: For component rendering
