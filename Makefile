.PHONY: install test

circle-install:
	curl --remote-name https://raw.githubusercontent.com/Shyp/set-node-npm/master/set-node-npm
	chmod +x set-node-npm
	./set-node-npm
	-psql --command 'create database sailspg;' --username ubuntu


install:
	npm install
	-psql --command 'create database sailspg;'

test:
	TZ=GMT node test/integration/runnerDispatcher.js

clean: 
	rm -rf node_modules
	-psql --command 'drop database sailspg;'
