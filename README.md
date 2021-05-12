***
# **State Libraries**

## Next.js

### Pros
* Allows for file based routing
* Adding query params to routes is very simple, and allows us to control a large portion of state via routes
* Built-in SSR
* Built-in caching during dev, pages are pre-built and rehydrated via client in production
* Router object easily accessible via `useRouter` hook

### Cons
* Parameter based routing (e.g [id].js) can be tricky to follow - might just require getting used to.
* Requires workarounds to incorporate styled-components
* Requires workarounds to play nicely with Redux state loaded from localStorage

***

## React Query

### Pros
* Allows brilliant caching of server requests
* Plays very nicely with Next.js by retrieving search params and adding them to fetch options

### Cons
* Bit of a finicky set up with Typescript (setting QueryKey props for example)
  * This can be circumvented via hooks.

***

## ReduxJS Toolkit

### Pros
* Far less boilerplate and setup than vanilla Redux
* Allows us to create ‘slices’ which return actions and the reducer. These are very simple to set up.
* Bundles commonly used middleware in by default.
* Easy to load into localStorage to persist settings state.

### Cons
* Still requires a fair amount of boilerplate and code setup.
* Doesn’t play nicely with Next.js and localStorage
  * Requires redux-persist to reliably load props from localStorage.
***
## React Context

### Pros
* Very little boilerplate, all of it is encapsulated in one file.

### Cons
* A bit finicky to set up with TypeScript. 
  * Requires that you set up functions in `createContext` to return void if they don’t return something later on.
* Shares similar problems with Redux when loading in state from localStorage
  * Nothing like Redux-Persist to help us out either.
***
# **Component Libraries**

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
* Not as visually appealing as other options (and everything is using it these days).

***

## React Bootstrap
### Pros
* Simple set up.
* Looks really clean!
* Nicely composable
* Still follows a lot of the design principles and ideas that made Bootstrap popular in the first place.

### Cons
* Doesn’t allow pass through of classNames or IDs to any of the components I used.
* Doesn’t play nicely with Next.js `<Link>` elements
  * React Bootstrap needs `<Nav.Link>` which interferes with Next.js
  * Styling also seems to be an issue - Links show up as navbar background colour instead of white.
  * Can be fixed by adding `passHref` from Next.js `<Link />` component
* Bundles a lot of code into modules. You import `<Form>` for example and receive everything with it.
* Limited scope for theming.
* Classes can ‘bleed’. Adding .jumbotron as a class to a component makes that component just like any other `<Jumobtron />` component.
* Theming requires .scss files

***

## Ant Design
### Pros
* Very smooth looking components
* Components do a lot of things and very neatly.
  * Similar scope as Material-UI, but doesn't feel quite so bloated.
* Size levels numbered, not text based
  ``` javascript
  <Title level={3}>Page Title</Title>
### Cons
* Janky import syntax. You import a folder and deconstruct into `const`s. Alternatively you can `import` from `antd/dist/*`
* Bad support for TypeScript. Requires an import to an extraneous dependency to access Menu event interfaces.
* Uses Less
  * Theming via .less stylesheets
    * No JSON object spreading.
  * Not too much of a problem considering that it's more than likely that we'll use styled-components for our own things.
  * If we absolutely MUST use Sass, there's a guide for doing that here: https://gist.github.com/Kruemelkatze/057f01b8e15216ae707dc7e6c9061ef7. It's a bit long-winded though.
  * Requires use of @zeit/next-less which is deprecated and disables Next.js's in-built CSS loaders.
    * Might not be a problem if we're using styled-components?

***

## Semantic UI React

### Pros
* Easily composable components
### Cons
* Does everything Ant Design does, but worse...?
* A bit unintuitive at times.
* Size levels text-based, not numbered. 
  ``` javascript
  <Title level={3}>Page Title</Title>
* Theming is more difficult than with any others
  * Requires building your own CSS bundle via Gulp
  * Uses Less as well (whyyyyyy?)
    * Requires deprecated @zeit/next-less plugin
  * Running `npx @semantic-ui-react/bootstrap`:
    * checks for (and requires) the presence of modules we won't use ¯\_(ツ)_/¯
    * Requires a craco.config.js file (because it assumes we've used create-react-app)
  * DEALBREAKER: Set up involves committing an entire dependency into git. This is a no no.

***

## Blueprint JS
### Pros
* Written in TypeScript
  * Has its own `*.d.ts` files
* Simple import of CSS (No Less! 😀)
* Simple way to add interactivity to `<Card />` components.
* Modules mapped under `@blueprintjs`
  * Shows an understanding of modern library building practices.
### Cons
* Requires the following:
  * Map
  * Set
  * Array.prototype.fill
  * Array.prototype.from
  * String.prototype.startsWith
* Classes prefixed with `bp3`
  * Could be an issue when upgrading to future versions?
* Advocates using `<button>` over `<a>` in `<Navbar />`
* `<Popover />` is deprecated. Use `<Popover2 />` 🤮
* Passes content as a prop a LOT
  * Bit of an anti-pattern because it prevents flexibility in composability.
* `<Select />` component requires that you specify a new iteration of the component for each type supplied to it.
* `<Textarea />` leaves a little to be desired, but how much this will be an issue will depend on how much we plan on using it.
* Zero theming capabilities
* Feels fiddly in places. Oftentimes it felt easier to use regular HTML and styled-components

***
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
