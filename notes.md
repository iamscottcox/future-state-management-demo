# State

## Next.js

### Pros
* Allows for file based routing
* Adding query params to routes is very simple, and allows us to control a large portion of state via routes

### Cons
* Parameter based routing (e.g [id].js) can be tricky to follow - might just require getting used to.

## React Query

### Pros
* Allows brilliant caching of server requests
* Plays very nicely with Next.js by retrieving search params and adding them to fetch options

### Cons
* Bit of a finicky set up with Typescript (setting QueryKey props for example), but can be circumvented via fetch hooks.

## ReduxJS Toolkit

### Pros
* Far less boilerplate and setup than vanilla Redux
* Allows us to create ‘slices’ which return actions and the reducer. These are very simple to set up.
* Bundles commonly used middleware in by default.
* Easy to load into localStorage to persist settings state.

### Cons
* Still requires a fair amount of boilerplate and code setup.
* Doesn’t play nicely with Next.js and localStorage - Requires redux-persist to reliably load props from localStorage.

## React Context

### Pros
* Very little boilerplate, all of it is encapsulated in one file.

### Cons
* A bit finicky to set up with TypeScript. 
  * Requires that you set up functions in `createContext` to return void if they don’t return something later on.

# Components

## Material-UI

### Pros
* Very simple to set up
* Very customizable components
* Allows pass through of classNames or IDs to components
* Nice import syntax
  * Import via deconstruction or default from directory.

### Cons
* Feels 'bloated'...?
  * Tries to do too much?

## React Bootstrap
### Pros
* Simple set up.
* Looks really clean!

### Cons
* Doesn’t allow pass through of classNames or IDs to components
* Doesn’t play nicely with Next.js `<Link>` elements
  * React Bootstrap needs `<Nav.Link>` which interferes with Next.js
  * Styling also seems to be an issue - Links show up as navbar background colour instead of white.
  * Can be fixed by adding `passHref` from Next.js `<Link />` component
* Bundles a lot of code into modules. You import `<Form>` for example and receive everything with it.
* Limited scope for theming.
* Classes can ‘bleed’. Adding .jumbotron as a class to a component makes that component just like any other `<Jumobtron />` component.
* Theming requires .scss files

## Ant Design
### Pros
* Very smooth looking components
### Cons
* Theming via .scss stylesheets
  * No JSON object spreading.
* Janky import syntax. You import a folder and deconstruct into `const`s. Alternatively you can `import` from `antd/dist/*`
