"use strict";

module.exports = {
	rules: {
		"react/jsx-boolean-value": ["error", "always"], //	Enforce boolean attributes notation in JSX

		"react/jsx-child-element-spacing": 0, //	Ensures inline tags are not rendered without spaces between them

		"react/jsx-closing-bracket-location": ["error", "tag-aligned"], //	Validate closing bracket location in JSX

		"react/jsx-closing-tag-location": ["error"], //	Validate closing tag location for multiline JSX

		"react/jsx-curly-brace-presence": [
			"error",
			{
				props: "always",
				children: "always",
			},
		], //	Disallow unnecessary JSX expressions when literals alone are sufficient or enfore JSX expressions on literals in JSX children or attributes

		"react/jsx-curly-newline": ["warn"], //	Enforce consistent line breaks inside jsx curly

		"react/jsx-curly-spacing": ["warn", { when: false, children: true }], //	Enforce or disallow spaces inside of curly braces in JSX attributes

		"react/jsx-equals-spacing": ["error", "never"], //	Disallow or enforce spaces around equal signs in JSX attributes

		"react/jsx-filename-extension": [
			1,
			{
				extensions: [".js", ".jsx"],
			},
		], //	Restrict file extensions that may contain JSX

		"react/jsx-first-prop-new-line": ["warn", "multiline"], //	Ensure proper position of the first property in JSX
		// Force to using the standard form.

		"react/jsx-fragments": ["error", "element"], //	Enforce shorthand or standard form for React fragments
		// @todo Make it a rule?

		"react/jsx-handler-names": 0, //	Enforce event handler naming conventions in JSX

		"react/jsx-indent": ["warn", 2], //	Validate JSX indentation

		"react/jsx-indent-props": ["error", 2], //	Validate props indentation in JSX

		"react/jsx-key": ["error"], //			Report missing key props in iterators/collection literals
		// @todo Is 8 reasonable ?

		"react/jsx-max-depth": ["error", 8], //	Validate JSX maximum depth
		// @note Only check when element tag spans multilines

		"react/jsx-max-props-per-line": [
			"warn",
			{
				maximum: 1,
				when: "multiline",
			},
		], //	Limit maximum of props on a single line in JSX

		"react/jsx-newline": 0, //	Enforce a new line after jsx elements and expressions
		// @todo For performance case, throw out a warning, not mandatory.

		"react/jsx-no-bind": [
			"warn",
			{
				ignoreDOMComponents: false,
				ignoreRefs: false,
				allowArrowFunctions: false,
				allowFunctions: false,
				allowBind: false,
			},
		], //	Prevents usage of Function.prototype.bind and arrow functions in React component props

		"react/jsx-no-comment-textnodes": 0, //			Comments inside children section of tag should be placed inside braces
		// @todo

		"react/jsx-no-constructed-context-values": 0, //	Prevents JSX context provider values from taking values that will cause needless rerenders.

		"react/jsx-no-duplicate-props": ["error"], //			Enforce no duplicate props

		"react/jsx-no-literals": ["error"], //	Prevent using string literals in React component definition

		"react/jsx-no-script-url": ["error"], //	Forbid javascript: URLs

		"react/jsx-no-target-blank": ["error"], //		Forbid target="_blank" attribute without rel="noreferrer"

		"react/jsx-no-undef": ["error"], //			Disallow undeclared variables in JSX

		"react/jsx-no-useless-fragment": ["error"], //	Disallow unnecessary fragments
		// @todo

		"react/jsx-one-expression-per-line": [
			"error",
			{
				allow: "single-child",
			},
		], //	Limit to one expression per line in JSX

		"react/jsx-pascal-case": ["warn"], //	Enforce PascalCase for user-defined JSX components

		"react/jsx-props-no-multi-spaces": ["warn"], //	Disallow multiple spaces between inline JSX props
		// @todo Enforce not using spreading in html tag

		"react/jsx-props-no-spreading": [
			"error",
			{
				html: "enforce",
				custom: "ignore",
				explicitSpread: "enforce",
				// exceptions: [],
			},
		], //	Prevent JSX prop spreading

		"react/jsx-sort-default-props": 0, //	Enforce default props alphabetical sorting

		"react/jsx-sort-props": 0, //	Enforce props alphabetical sorting

		"react/jsx-space-before-closing": ["warn", "always"], //	Validate spacing before closing bracket in JSX

		"react/jsx-tag-spacing": [
			"warn",
			{
				closingSlash: "never",
				beforeSelfClosing: "always",
				afterOpening: "never",
				beforeClosing: "allow",
			},
		], //	Validate whitespace in and around the JSX opening and closing brackets

		"react/jsx-uses-react": ["error"], //			Prevent React to be marked as unused
		// @fixme Can lint this rule when procesing a production build

		"react/jsx-uses-vars": ["warn"], //			Prevent variables used in JSX to be marked as unused

		"react/jsx-wrap-multilines": [
			"warn",
			{
				declaration: "parens",
				assignment: "parens",
				return: "parens",
				arrow: "parens",
				condition: "ignore",
				logical: "ignore",
				prop: "ignore",
			},
		], //	Prevent missing parentheses around multilines JSX
	},
};
