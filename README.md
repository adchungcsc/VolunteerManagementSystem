# WEBAPPS-11

Project developed as part
of [CSC-342 Applied Web-based Client-Server Computing (webapps)](https://github.com/CSC-WebApps/Course)

This project was developed by myself ([Alex Chung](https://github.com/adchungcsc))
, [Ryan Catalfu](https://github.com/Rcatalfu), and [Lorenzo Battigelli](https://github.com/ldbattig) over the course of
approximately half a semester during Fall 2021. I primarily developed the backend.

The goal of this project was to create a full stack web application from scratch using NodeJs, Express, Angular,
Postgres, Azure Active Directory, NGINX, and Azure VM + Postgres DB. This application is a Volunteer Management System
that makes it easy to organize the creation, signup, attendance, and reports of volunteering events.

As of December 6, 2021, the server is deployed [here](https://participance.eastus.cloudapp.azure.com/landing)
https://participance.eastus.cloudapp.azure.com/landing

See running service [pictures](artifacts)

See how to deploy the server here:
[Runbook](deployment/setup-instructions.md)

On the backend we are using packages like [passportJS](http://www.passportjs.org/) along with
the [AzureAD Oauth2 strategy](http://www.passportjs.org/packages/passport-azure-ad-oauth2/) to handle authentication. We
are also using [sequelize](https://sequelize.org/) for ORM.

### Progress Table

| Page         | Status     | Wireframe |
|--------------|-----------|------------|
| Landing | Done | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/landing.jpg) |
| Home      | Done | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/dashboard.jpg) |
| Find an Event      | Done  | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/find-event.jpg) |
| My Registered Events      | Done  | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/my-events.jpg) |
| Create an Event      | Done | [Wireframe](https://githu.nbcsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/create-event.jpg) |
| Dashboard | Done | https://media.github.ncsu.edu/user/11654/files/9388e308-62de-407f-8282-41c3eca9981d(https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/reports-user.jpg) |
| Manage Event  | Done | https://media.github.ncsu.edu/user/11654/files/87c3919c-6655-4b47-b091-3619c9e6c489 |

### API Endpoints

| Endpoints         | Status     | Purpose |
|--------------|-----------|------------|
| GET /auth/azureadouath2 | Finished | Handle login with 3rd party oauth provider azure ad |
| GET /callback|  Finished | Handle callback from 3rd party provider in oauth workflow |
| GET /event/{id} | Finished | Return list of event or get event by id |
| POST /event/ | Finished | Insert an event (form encoded) |
| PUT /event/ | Finished | Update an event (form encoded) |
| DELETE /event | Finished | Let users delete an event|
| GET /user/organization | Finished | Return list of users in system |
| GET /user/{id} | Finished | Return current user or specific user by id|
| GET /signup/event/{id} | Finished | Return list of user signups for a given event|
| GET /signup/user/{id} | Finished | Return list of signups for events for a given user|
| POST /signup/ | Finished | Let users signup for an event|
| DELETE /signup/{id} | Finished | Let users delete their signup for an event|
| GET /attend/event/{id} | Finished | Return list of registered attendances for an event |
| GET /attend/user/{id} | Finished | Return list of registered attendances for a given user |
| POST /attend/ | Finished | Let users register their attendance for an event|
| PUT /attend/ | Finished | Let users edit their submitted attendance for an event|
| DELETE /attend/{id} | Finished | Let users deletet heir submitted attendance for an event|

### Pitch

Our team is building a web-based volunteer management system to help nonprofits/volunteering organizations monitor,
orchestrate their volunteering events, and allow members to volunteer with a single unified platform for creating
volunteer opportunities, signing up for those opportunities, verifying attendance, and tracking volunteer hours. This
free web-based application improves over manual spreadsheets and hour sheets, and is also better than existing platforms
that require expensive subscriptions.

### Wireframe

https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/main/Volunteer%20Manager.pdf

### M1 Demo Video

https://drive.google.com/file/d/10xpLSYd45yZM1qrMiOw33iecIT7S0Hhu/view?usp=sharing

### M2 Demo Video

http://csc342m2video.catalfu.com

### M3 Demo Video

https://ncsu.zoom.us/rec/share/kTpD4yGqKeoQ_Jlydhu7O6LzlEvVxg9Zr1zHNaZ6TLdbsNNGxxE-9w_eZB6ZiznQ.YLlY6qRFGNYAHg47?startTime=1638246682000
password: CSC342Final!

Site address: https://participance.eastus.cloudapp.azure.com/

Setup instructions: https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/deployment/setup-instructions.md

### Final Report

https://docs.google.com/document/d/1lLeIolqcR6v2HUnuqYi_vz9k1VDCHAXO7ZBQWX06LjY/edit

### Acceptance Tests

https://docs.google.com/document/d/1pMbShJ9xZyFOe-AQPeQMRh8Fm-tZL_poFQ9uUewimPM/edit
