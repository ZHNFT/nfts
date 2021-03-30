module.exports = {
  rules: {
    "react/boolean-prop-naming": [
      "error",
      {
        propTypeNames: ["bool"],
      },
    ], // Enforces consistent naming for boolean props
    "react/button-has-type": 0,
    "react/default-props-match-prop-types": ["error"], // Enforce all defaultProps are defined and not "required" in propTypes.
    "react/destructuring-assignment": 0, // Enforce consistent usage of destructuring assignment of props, state, and context
    "react/display-name": 0, // Prevent missing displayName in a React component definition
    "react/forbid-component-props": ["error", { forbid: [] }], // Forbid certain props on components
    "react/forbid-dom-props": ["error", { forbid: [] }], // Forbid certain props on DOM Nodes
    "react/forbid-elements": ["error", { forbid: [] }], // Forbid certain elements
    "react/forbid-foreign-prop-types": ["error", { forbid: [] }], // Forbid using another component's propTypes
    "react/forbid-prop-types": 0, // Forbid certain propTypes
    "react/function-component-definition": 0, // Standardize the way function component get defined
    "react/no-access-state-in-setstate": ["error"], // Reports when this.state is accessed within setState
    "react/no-adjacent-inline-elements": ["error"], // Prevent adjacent inline elements not separated by whitespace.
    "react/no-array-index-key": ["error"], // Prevent usage of Array index in keys
    "react/no-children-prop": ["warn"], // Prevent passing of children as props.
    "react/no-danger": ["warn"], // Prevent usage of dangerous JSX props
    "react/no-danger-with-children": ["warn"], // Report when a DOM element is using both children and dangerouslySetInnerHTML
    "react/no-deprecated": ["warn"], // Prevent usage of deprecated methods
    "react/no-did-mount-set-state": ["error"], // Prevent usage of setState in componentDidMount
    "react/no-did-update-set-state": ["error"], // Prevent usage of setState in componentDidUpdate
    "react/no-direct-mutation-state": ["error"], // Prevent direct mutation of this.state
    "react/no-find-dom-node": ["error"], // Prevent usage of findDOMNode
    "react/no-is-mounted": ["error"], // Prevent usage of isMounted
    "react/no-multi-comp": ["error"], // Prevent multiple component definition per file
    "react/no-redundant-should-component-update": ["error"], // Flag shouldComponentUpdate when extending PureComponent
    "react/no-render-return-value": ["error"], // Prevent usage of the return value of React.render
    "react/no-set-state": ["error"], // Prevent usage of setState
    "react/no-string-refs": ["error"], // Prevent string definitions for references and prevent referencing this.refs
    "react/no-this-in-sfc": ["error"], // Report "this" being used in stateless components
    "react/no-typos": ["error"], // Prevent common typos
    "react/no-unescaped-entities": ["error"], // Detect unescaped HTML entities, which might represent malformed tags
    "react/no-unknown-property": ["error"], // Prevent usage of unknown DOM property
    "react/no-unsafe": ["error"], // Prevent usage of unsafe lifecycle methods
    "react/no-unused-prop-types": ["error"], // Prevent definitions of unused prop types
    "react/no-unused-state": ["error"], // Prevent definition of unused state fields
    "react/no-will-update-set-state": ["error"], // Prevent usage of setState in componentWillUpdate
    "react/prefer-es6-class": 0, // Enforce ES5 or ES6 class for React Components
    "react/prefer-read-only-props": ["warn"], // Require read-only props.
    "react/prefer-stateless-function": ["warn"], // Enforce stateless components to be written as a pure function
    "react/prop-types": ["warn"], // Prevent missing props validation in a React component definition
    // Useless after v17, react inject automatically.
    "react/react-in-jsx-scope": 0, // Prevent missing React when using JSX
    "react/require-default-props": ["warn"], // Enforce a defaultProps definition for every prop that is not a required prop.
    "react/require-optimization": 0, // Enforce React components to have a shouldComponentUpdate method
    "react/require-render-return": ["error"], // Enforce ES5 or ES6 class for returning value in render function
    "react/self-closing-comp": ["warn"], // Prevent extra closing tags for components without children
    "react/sort-comp": 0, // Enforce component methods order
    "react/sort-prop-types": 0, // Enforce propTypes declarations alphabetical sorting
    "react/state-in-constructor": 0, // State initialization in an ES6 class component should be in a constructor
    "react/static-property-placement": 0, // Defines where React component static properties should be positioned.
    "react/style-prop-object": ["error"], // Enforce style prop value is an object
    "react/void-dom-elements-no-children": ["error"], // Prevent passing of children to void DOM elements (e.g. <br />).
  },
}
