# Coding Challenge

This coding challenge is designed to assess how you approach and solve a problem that is very similar to the day to day way of working at MerchantSpring. It is based off a real requirement to give you a sense of what the work is like, however it is not real work for our product. It shouldn't take more than a few hours, there are no hidden tricks, please approch this problem as you would if you were releasing it to production.

## Assets

- coding-challnge-api - this is the backend (NodeJS, Typescript + Express)

## CSV Data

The current project depends on two CSV files

- stores.csv
- orders.csv (this is a huge file so is provided as gzip and would have to be unzipped and placed in the folder to be read from)

### Folder Structure

```
coding-challenge
│
└───coding-challenge-api
│   │
│   └───data
│   |   │   stores.csv
│   |   │   orders.csv
│   │
│   └───src
|
└───coding-challenge-ui
```

## Contents

* [Manual Deployment](#manual-deployment)

## <a id="manual-deployment"></a>Manual Deployment

### Setup Node.js

Inorder to setup NodeJS you need to fellow the current steps:

#### Mac OS X

* Step1: Install Home brew

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

$ brew -v
```

* Step2: Install Node using Brew

```
$ brew install node

$ node -v

$ npm -v
```

#### Linux Systems

* Step1: Install Node using apt-get

```
$ sudo apt-get install curl python-software-properties

$ curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -

$ sudo apt-get install nodejs

$ node -v

$ npm -v
```
### Setup Application

* Step1: Git clone the application

* Step2: Install node modules

```
$ npm install
```

### To run:

`npm run dev`

### To run tests:

`npm run test`


#### Your backend will run at http://localhost:8080/ you can check the backend is running properly by simply clicking on the link http://localhost:8080/sales