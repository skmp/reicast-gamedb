# Reicastdb App

> A data-driven Quasar / Vuejs based SPA for the Reicast db website. The site incorporates the existing test 
report google forms and game data from IGDB. The SPA routes are prerendered for SEO purposes in production.

> The codebase is built on top of the Quasar framework allowing us to make builds targeting mobile (via Cordova) 
and desktop (via Electron) platforms (+ different architectures) with relative ease. 
Existing Docker environments configured for building Android, Windows and Linux executables are used in the repository.

#### What is Quasar?
[Quasar](https://quasar-framework.org/) is a framework for building hybrid mobile apps using Cordova, desktop apps using Electron,
Single Page Apps, Server-side Render apps and Progressive Web apps all from a single VueJS codebase.

#### What is Cordova?
[Cordova](https://cordova.apache.org/) is a library for building cross-platform mobile applications with HTML, CSS, and JavaScript.

#### What is Electron?
[Electron](https://electronjs.org/)  is a library for building cross-platform desktop applications with HTML, CSS, and JavaScript.

#### What is VueJS ( :heartbeat: ) ?
[VueJS](https://https://vuejs.org/) is a lovable, scalable modern javascript framework.


## Linked Docker images

We use two Docker images to build for Android and Windows respectively.
The Linux builds should work on either of those images.

## OS Notice

The current state of this README has been written while working on a Linux machine. While the bulk of this information 
should be valid for Windows or Mac, some parts of it may need some tweaking. 

## Prerequisites

On your local machine you will first need to have installed:

- [Docker](https://docs.docker.com/install/)
- [node](https://nodejs.org/en/download/package-manager/)
- yarn ( `npm install -g yarn` , or [platform specific way](https://yarnpkg.com/lang/en/docs/install/) )

## Optional / Alternative

If you don't intend on running platform related build commands (other than that of the SPA) and just want to develop the SPA:

You have the option of substutiting Docker with the installation of [Quasar CLI](https://v0-17.quasar-framework.org/guide/quasar-cli.html) globally


    npm install -g @quasar/cli

> Even if you do use Docker though, it is not a bad idea to install Quasar CLI globally as well.

## Installation

    git clone https://github.com/reicast/gamedb
    cd gamedb
    yarn

## Commands

#### Start a dev server
To launch a hot reload dev environment (@ localhost:8080)

    npm run dev

Or, alternatively - If you have Quasar CLI installed

    quasar dev

#### Build for the web (SPA)

    npm run build

Or, alternatively - If you have Quasar CLI installed

    quasar build


> The final process of the build includes the prerendering of the routes by the 
[prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin).
This process may take a while without giving any feedback until it's completed (or failed).

>The routes used are the enumerated files in data/buildRoutes. 
These were split into multiple files to decrease chances of prerendering failure.

#### Preview SPA build in web server

If you have Quasar CLI installed

    quasar serve docs/

#### Build for Android

    npm run android:apk


After building, if you wish to install the build on your android device:

- connect it to your computer with a usb
- Android developer settings enabled
- USB configuration set to MTP


    npm run android:apk-device

or just sideload it instead :P

#### Build for Windows, Linux

    npm run windows
    npm run linux

#### Permission issues and Docker

When commands running inside the Docker container modify or create files, these have a different owner (1000).

This may affect you when it happens either in the 'dist' (during builds) or the 'node_modules'
(during installs run from inside container) folders.


You may occasionally run into permission issues when running some commands locally (not using Docker) afterwards.
In that case simply 'chown' them back to the current user.

Helper scripts for 'dist' or the 'node_modules' respectively:

    npm run own:dist
    npm run own:node

> ##### TODO: Permission issues and Docker
>Forcing Docker to use the same ID as the current user may be a viable solution to this issue that remains to be
tried and tested across the app's workflow.

>The added parameter to the 'docker run' command would be:

    -u `id -u`


## Useful links

[Vue Docs](https://vuejs.org/v2/guide/)

[Quasar Docs](https://quasar-framework.org/guide/index.html)

[Cordova Docs](https://cordova.apache.org/docs/en/latest/)

[Electron Docs](https://electronjs.org/docs)
