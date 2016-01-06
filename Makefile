.PHONY: install test

install:
	npm install
	-psql --command 'create database sailspg;'

test:
	TZ=GMT node test/integration/runnerDispatcher.js

clean: 
	rm -rf node_modules
	-psql --command 'drop database sailspg;'
