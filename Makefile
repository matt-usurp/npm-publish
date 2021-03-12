# --
# -- Code Formatting & Linting
# --

.PHONY: \
	code \
	code.fix

code:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--format codeframe \
			./src

code.fix:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--fix \
		--format codeframe \
			./src

# --
# -- Testing
# --

.PHONY: \
	test

test:
	npx jest --verbose

# --
# -- Build
# --

.PHONY: \
	build

build:
	npx webpack --config build/webpack.config.js
