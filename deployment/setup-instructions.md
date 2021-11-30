# Setup Runbook

Skip steps 0, 1, 2 and 3 if already done once.

0. Setup Azure Active Directory
    - Follow microsoft azure ad app [instructions](https://docs.microsoft.com/en-us/azure/app-service/configure-authentication-provider-aad#--option-1-create-a-new-app-registration-automatically) to set up app.
    - Set redirect URL in WEB app (DO NOT PICK SINGLE PAGE APP) to point to `https://DESIRED_SUBDOMAIN.eastus.cloudapp.azure.com/callback`
      - Also set dev env redir urls if desired at localhost.
    - Copy app configurations in preparation to use in app.
      - client ID
      - client secret
      - desired redirect uris

1. Provision Azure Postgres Database
   - Allow incoming connections from your IP addresses (configure your home/company network IP address on allowlist)
   - Choose cheapest postgres database needed
   - Once provisioned and credentials set, run DDL to configure schema
     - WEBAPPS-11/schema/schemav2.sql

2. Provision Azure Virtual Machine (Cloud web dashboard UI intermittently changes but core configurations stay save)
   - On provision step, allow incoming and outbound traffic from HTTPS port 443 and HTTP port 80 in firewall rules
     - Azure services should be allowed by default through firewall (needed to connect to DB instance)
   - Choose preferred security type (key or user+pass). Will be needed to SSH later.
   - Pick Ubuntu Server 20.04 image
   - Minimal resource VM needed (Tested to work with configured 1 core and 1 gigabyte of RAM)
   - Setup 30gb disc with this VM (any variant or size greater than 30gb works (we used 30))
   - Pick region (we used eastus in this tutorial)
   - Set subdomain on `DESIRED_SUBDOMAIN.eastus.cloudapp.azure.com`  (we chose `participance` as subdomain)
  
3. Configure Azure Virtual Machine With Required Software
   - SSH to VM `ssh USERNAME@DESIRED_SUBDOMAIN.eastus.cloudapp.azure.com`
     - Enter credentials or pass in key as needed
   - Update
     - `sudo apt-get update`
   - Install [nodejs and npm](https://linuxhint.com/install_node-js_npm_ubuntu/) and update to nodejs 16 and npm to latest version.
     - See linked tutorial on how to install and update to desired versions
   - Install [pm2](https://pm2.keymetrics.io/) 
     - `npm install pm2 -g`
   - Install [nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04) 
     - `sudo apt install nginx` (do not configure yet just install it)
     - Navigate to `http://DESIRED_SUBDOMAIN.eastus.cloudapp.azure.com` in browser from local machine to verify nginx service working & that firewall rule is working.

4. Build Project & Push to Server (On Development machine) (These steps for building can be done on the target machines if needed AND IF IT HAS ENOUGH RESOURCES.)
     - [Have project repo cloned](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-11)
     - Clone repository from github and start at root of project
     - Change directory to frontend
       - `cd frontend`
     - Build angular frontend project in preparation for serving statically
       - `npm i` install frontend dependencies
       - `ng build --prod`
       - Built static angular project frontend files will be placed in dist directory at same level.
     - Prepare backend server.
       - navigate to server directory (assuming coming from frontend dir) `cd ../server`
       - `npm i` install server dependencies
     - Compress project
       - navigate back to one level outside of root (assuming coming from server dir) `cd ../../`
       - zip project `zip -r WEBAPPS-11.zip WEBAPPS-11` (or tarball) so that it's easier to copy.
     - Toss to remote VM.
       - `scp -r WEBAPPS-11.zip USERNAME@SUBDOMAIN.eastus.cloudapp.azure.com:~/` secure copy the zip file over to the server
       - `ssh USERNAME@DESIRED_SUBDOMAIN.eastus.cloudapp.azure.com` ssh to home directory and verify zip file arrived.
       - `sudo rm -rf WEBAPPS-11` Delete previous files if present from previous deployment
       - `unzip WEBAPPS-11.zip` expand files on target machine (assuming sshed in).

5. Setup project on remote VM.
    - Connect to VM if not already
      - `ssh USERNAME@DESIRED_SUBDOMAIN.eastus.cloudapp.azure.com`
    - Get to position
      - `cd WEBAPPS-11`
    - Become root user (Easier but not ideal way of working with lower parts fs touched by services)
      - `sudo su`
    - Move built frontend to target directory
      - `rm -rf /var/www/VolunteerManager/` remove old if exist
      - `cp -r frontend/dist/VolunteerManager /var/www`
    - Setup SSL certificate for HTTPS (HTTPS needed as Azure AD based login systems ban HTTP redirect URI).
      - Optional non-prod self-signed certificate (currently used but not suitable for prod).
        - `sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt`
      - [tutorial on both self-signed and real certificate with nginx](https://www.fhtino.it/blog/experiment-how-to-assign-a-domain-name-and-activate-https-on-a-free-or-shared-azure-web-site)
    - Setup reverse proxy & static file hosting (configuring NGINX).
      - overwrite nginx.conf in *etc/nginx/nginx.conf* with nginx.conf in *deployment* dir of project 
      - copy contents of file *deployment/participance* in WEBAPPS-11 directory into */etc/nginx/sites-available* `cp /home/USERNAME/WEBAPPS-11/deployment/participance /etc/nginx/sites-available`
      - symlink file from sites-available into sites-enabled. `ln -s /etc/nginx/sites-available/participance /ec/nginx/sites-enabled/participance` (View contents of sites-enabled to verify proper link. WARNING: DO NOT SYMLINK WITH RELATIVE PATH IT WON'T WORK)
      - validate NGINX configuration `nginx -t` (Will warn or okay your configuration)
      - Restart NGINX service `systemctl restart nginx`
      - Navigate to `https://DESIRED_SUBDOMAIN.eastus.cloudapp.azure.com` in browser from local machine to verify your files are being served.
        - Note: HTTP should not be enabled. Only HTTPS.
      - change directory back to WEBAPPS-11/server `cd /home/USERNAME/WEBAPPS-11/server`
      - set required environment variables in FILE *volunteer-manager.config.js* in PRODUCTION ENVIRONMENT for pm2 (variables with example configuration) (server will not run without these)
        - `DB_CONN_STR=postgres://DATABASE_USERNAME@DATABASE_NAME:DATABASE_PASSWORD@DATABASE_NAME.postgres.database.azure.com:5432/DATABASE?ssl=true`
        - `CALLBACK_URL=https://participance.eastus.cloudapp.azure.com/callback`
        - `CLIENT_SECRET=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
        - `SESSION_SECRET=SOMETHINGSECRETTHATSNOTADICTIONARYWORDORSOMETHINGEVERSAIDBEFOREORSUPERRANDOM`
      - Running the server.
        - (NOT RECOMMENDED EXCEPT FOR SMALL TEST (MUST ALSO SET ENV VARS ON SERVER)) run server quick and dirty `node index.js`
        - (*RECOMMENDED* MORE ROBUST & WILL RUN IN BACKGROUND EVEN IF TERMINAL CLOSED) `pm2 start volunteer-manager.config.js --env production`
      - Stopping the server
        - `pm2 stop VolunteerManager` Stop pm2
