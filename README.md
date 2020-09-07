## Holo Bot Setup Guide

Since the bot has been shut down with no plan on activating it, We as Developers. Decided to open source base code for User to Host for themself. 

**Feel free to contribute if there a mistake**

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ryanshds/holobot/blob/master/LICENSE) file for details

## Requirements
- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 10.x or higher](https://nodejs.org)
- `token` Required to start the bot obtain it [here](https://discordapp.com/developers/applications/)

## Downloading

In a command prompt in your project's folder (wherever that may be) run the following:

`git clone https://github.com/ryanshds/holobot.git`

Once finished:

- In the folder from where you ran the git command, run `cd holobot` and then run `npm install`, this will install all required packages, then it will run the installer.

## Starting

To start the bot, in the command prompt, run the following command:
`node index.js`

## Inviting the bot

To add your bot to your server go to this site

[Discord Permission Calculator](https://discordapi.com/permissions.html)


## Issue:

First of all, Holo is using quick.db and Enmap as her database. Installation guide for quick.db on windows can be found [Here](https://github.com/plexidev/quick.db/issues/152#issuecomment-543740060)

Enmap installation, can be found [Here](https://enmap.evie.dev/install)

You need to install **better-sqlite3** to continue using **quick.db** and **enmap**
> npm install better-sqlite3

If you encounter error, make sure to install **Visual Studio C++ Build Tools**
Windows:
> npm i -g --add-python-to-path --vs2015 --production windows-build-tools

> It's very important that this be run in the administrative prompt, and not a regular one.

Linux:
> sudo apt-get install build-essential

Everything is now done, you now can run
> npm install

Please let me know if you encounter another issue
