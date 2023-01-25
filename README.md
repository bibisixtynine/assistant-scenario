# bibil 

230125 - Tested with local VSCODE ok

### Bienvenu 👋
Demandez votre scénario !

## How to edit with VSCODE ?
# clone the the "assistant-scenario" project from github repo in your github account
[the assistant-scenario repo](https://github.com/bibisixtynine/assistant-scenario.git)
=> now your have your own copy on github !
# download this clone on your computer with VSCode and the adress of your clone
=> your cloned project url should look like:
https://github.com/YOUR_GITHUB_USERNAME_HERE/assistant-scenario.git
# install next, react, and react-dom and then run yarn to get the project going :
cd into the repo
=> cd assistant-scenario
install next if you don't have it
=> yarn add next react react-dom
run it
=> yarn dev
# Head to [localhost:3000](http://localhost:3000) you should see the webapp !

# How to debug ?
There is a .vscode/launch.json file that will autoconfigure vscode debugger. Just choose to launch in the debugger the "Next.js: debug ..." of your choice (server-side, client-side, full-stack)



## How to deploy with VERCEL (by nextjs team)?
Go on https://vercel.com/, and choose the pro plan (the free plan are not waiting long enough answer of openai server, resulting of a 500 error code). There is a 14 free trial then it will cost $20 per month
Follow this instructions... and these tip :
- must create in vscode a .env file inspired from the .env.example file, filled with your KEYS...
- you must add in vercel project settings - environment variables those in .env project file
--> CAUTION : DON'T ADD "" ON VERCEL ENV VARIABLES !


