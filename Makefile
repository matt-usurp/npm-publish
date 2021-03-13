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
	test \
	test.build

test:
	npx jest --verbose

test.build:
	INPUT_VERSION="v1.2.3" INPUT_TOKEN="some-token" node build/action/bundle.main.js

# --
# -- Build
# --

.PHONY: \
	build \
	build.clean \
	build.tsc \
	build.tsc.clean \
	build.webpack \
	build.webpack.clean

build: \
	build.clean \
	build.tsc \
	build.tsc.clean \
	build.webpack \
	build.webpack.clean

build.clean:
	rm -rf build/workspace
	mkdir -p build/workspace

build.tsc:
	npx tsc --project build/tsconfig.json

build.tsc.clean:
	find build/workspace -type f -name "*.spec.js" -delete
	find build/workspace -type f -name "*.spec.js.map" -delete
	find build/workspace -type f -name "*.spec.d.ts" -delete

build.webpack:
	npx webpack \
		--config build/webpack.config.js \
		--color \
		--stats

build.webpack.clean:
	find build/action -type f -name "*.txt" -delete
