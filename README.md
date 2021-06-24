[![Build Status](https://travis-ci.org/binary-com/binary-bot.svg?branch=master)](https://travis-ci.org/binary-com/binary-bot)
[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-bot/badge.svg?branch=master)](https://coveralls.io/github/binary-com/binary-bot?branch=master)

# Binary Bot

Visual automation for binary bot- [bot.binary.com](https://bot.binary.com)

Binary Bot uses [Google Blockly](https://developers.google.com/blockly) to provide a puzzle like automation environment to trade using binary.com API version 3.
## Pre-installation
Ensure that your environment contains the following packages.
``` 
 - node
 - npm
 - git (for contribution)
 ```
 ## Installation

### 1. Setup the project on local machine

In order to work with Binary-Bot application, you must create your own version of this project. Please fork the project - https://github.com/binary-com/binary-bot to your git account.

You will need to perform the following on your development machine:
1. Change the current working directory to the location where you want the cloned directory.
2. Clone the forked repo using ```git clone [URL for the forked repo]```
3. Run ```cd binary-bot```
4. Create a feature branch from master -  ```git checkout -b [branchName]```.
5. Run ```npm install```

    >**Note:** - [issue with installing packages](#q1)
### 2. Configuring Hosts file
In order to run our application for the first time, you need to configure your hosts file:

If you are using a UNIX based system (Mac or Linux), Do the following:

1. Open terminal.
2. Open hosts file in your preferred text editor using ``` sudo vim /etc/hosts```.
3. Add a new entry pointing to ```127.0.0.1  localbot.binary.sx```
4. Save the file

For Windows:

 1. Run Microsoft Notepad as an administrator. 

 2. From Notepad, open the file: ```c:\Windows\System32\Drivers\etc\hosts```

 3. Add a new entry pointing to ```127.0.0.1  localbot.binary.sx```

 4. Save the file

### 3. Starting a Development Server
Make sure to set the endpoint for running the application on the localhost

 1. Run ```npm start``` on the binarybot directory. This will open the application in your default browser.
 
     >**Note:** - [Getting Permission Denied Error](#q2)

2. Now we have to set the endpoint for running the application on the localhost.
   For this, Go to ```http://localbot.binary.sx/endpoint.html```. Make sure the Server is set to ```blue.binaryws.com``` and O Auth App ID is ```16014```
   Click submit.
   
3.  Navigate to ```http://localbot.binary.sx/bot.html``` (Note that the protocol is ```http``` and not ```https```)

    >**Note:** - [Getting error "This site can’t be reached" on localhost](#q3)

4. And now you are ready with your setup.Login to the binary account using the Binary.com account credentials. Run the bot


## Pushing changes to github

1. Make your changes to the source code
2. Run test command to make sure your changes are correct
```npm run test```
3. Push your changes to your forked repo:
```
git add .
git commit -m "describe your changes"
git push origin BRANCH_NAME
```
## Deploying to local gh-pages
You can set up your GitHub Pages to deploy your repository.

1. First you need to set up custom domain. Go to ```https://github.com/YOUR_GITHUB_USERNAME/binary-bot/settings/pages``` and set your custom domain to ```YOUR_GITHUB_NAME.binary.sx```

2.  Run the command below in your project directory.
```
npm run release --branch [branchname] # can contain /
```
3. Now, your repository can be found at ```https://YOUR_CUSTOM_DOMAIN/BRANCH_NAME```
## Deployment/Release

```
gulp test-deploy # for local test deploy
npm run release --branch <branch-name> # to deploy a branch (eg., beta)
npm run release-production # to release it to production
```
## To update to latest version

```
git pull --rebase upstream master
npm install
```
## Running the CLI command

```
npm i -g binary-bot
bot -h // For a quick help
bot bot-example.js
```

### Running with a specific endpoint **Use only if you know what you're doing**

```
ENDPOINT='wss://ws.binaryws.com/websockets/v3?l=en&app_id=1169' bot bot-example.js
```

### CLI examples:
[`speed-test.js`](https://github.com/binary-com/binary-bot/blob/master/cli-examples/speed-test.js)

## Think you found a bug?

There's a chance that we already know about it and doing our best to fix it. To find out you can search our [GitHub issues](https://github.com/binary-com/binary-bot/issues)

Not satisfied yet? Please create a new issue, and explain to us what is the nature of the problem and how to reproduce [here](https://github.com/binary-com/binary-bot/issues/new)

## We'd love to hear from you

Please send us your inquiries through marketing@binary.com

## Sample Blocks

You can find some example blocks in the [`Examples`](/examples) folder.

**Disclaimer**: _All the files and codes in the above links are intended for educational and informational purposes only. They should not be construed as giving investment advice, and you should not rely on them as your singular factor in making or refraining from making any investment decisions. Binary.com accepts no liability whatsoever for any losses incurred by users in their trading. Binary options trading may incur losses as well as gains._


## FAQ

### <a name='q1'> 1. Issue with installing packages</a>
If you couldnt install binary bot with a different node version, try cleaning npm cache.
 - To clear a cache in npm, we need to run the ```npm cache clean --force``` command in our terminal.
 - Delete cache directory. The default cache directory is ~/.npm on Posix (mac or linux), or %AppData%/npm-cache on Windows.
 - Run ```rm -rf ~/.npm``` 
 - Run ```npm install```

### <a name='q2'> 2. Getting Permission Denied Error on localhost</a>
Try ```sudo npm start```instead of ```npm start```

### <a name='q3'>3. Cannot access the site</a>
 Make sure to use HTTP instead of HTTPS: https://localbot.binary.sx/bot.html  => http://localbot.binary.sx/bot.html

