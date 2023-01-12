# Shisha flavor website
Shisha flavor website built using [Django](https://www.djangoproject.com/) and [Angular](https://angular.io/). The database is local made using
[PostgreSQL](https://www.postgresql.org/). It features a list of flavors that can be viewed, the users being able to write comments about them. It features authentication and authorization.



# Front-end
Made using [Angular CLI 13.0.2](https://www.npmjs.com/package/@angular/cli/v/13.0.2) with [Angular Material](https://material.angular.io/) and some help from
[Animate.css](https://animate.style/).

## Prerequisites
Download and install [Node.js](https://nodejs.org/en/download/).

Download and install [Angular](https://angular.io/guide/setup-local). Using the following command will do:

```bash
npm install -g @angular/cli
```

## Installation
[Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [download](https://www.itprotoday.com/development-techniques-and-management/how-do-i-download-files-github) the application.

Run the following command using the command prompt in the main directory of the front-end part, in our case /Frontend/Shisha.

```bash
npm install
```

## Usage
Use the following command in the main directory of the front-end part, in our case /frontend. The website will be available to use at [localhost:4200](http://localhost:4200/).

```bash
ng serve
```


# Back-end
Made using [Django 4.1](https://docs.djangoproject.com/en/4.1/releases/4.1/) with [Django REST Framework](https://www.django-rest-framework.org/) for handling REST requests
and [Django simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) for better authentication and authorization.

## Prerequisites
Download and install [Django](https://www.djangoproject.com/download/), [Django REST Framework](https://www.django-rest-framework.org/#installation) [and Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html).

## Installation
[Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [download](https://www.itprotoday.com/development-techniques-and-management/how-do-i-download-files-github) the application.

## Usage
Use the following command in the main directory of the back-end part, in our case /backend. The back-end will be accessible at [127.0.0.1:8000](http://127.0.0.1:8000/).

```bash
python manage.py runserver
```
