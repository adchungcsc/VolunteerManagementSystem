# WEBAPPS-11

[Setup Instructions](deployment/setup-instructions.md)

### Progress Table
| Page         | Status     | Wireframe |
|--------------|-----------|------------|
| Landing | Done | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/landing.jpg) |
| Dashboard      | Done | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/dashboard.jpg) |
| Find an Event      | Done  | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/find-event.jpg) |
| My Registered Events      | Done  | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/my-events.jpg) |
| Create an Event      | Done | [Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/create-event.jpg) |
| Reports       | Modified-Done | [Wireframe (admin)](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/reports-admin.jpg), [Wireframe (user)](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/development/wireframes/reports-user.jpg) |

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
Our team is building a web-based volunteer management system to help nonprofits/volunteering organizations monitor, orchestrate their volunteering events, and allow members to volunteer with a single unified platform for creating volunteer opportunities, signing up for those opportunities, verifying attendance, and tracking volunteer hours. This free web-based application improves over manual spreadsheets and hour sheets, and is also better than existing platforms that require expensive subscriptions.

### Wireframe
https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11/blob/main/Volunteer%20Manager.pdf

### M1 Demo Video
https://drive.google.com/file/d/10xpLSYd45yZM1qrMiOw33iecIT7S0Hhu/view?usp=sharing

### M2 Demo Video
http://csc342m2video.catalfu.com
