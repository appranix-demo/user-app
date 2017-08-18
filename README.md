Report project
================

Building and running
-----

1. Install Java 1.8 JDK.  Validate it with `java -version`   It should be 1.8.  Validate the compiler as well with `javac -version`

2. Install gradle.

3. Build the project dependencies typing:

	gradle war

	the generated war file location sample-app/build/libs/demoapp.war	

5. set the database configuration

6. put the demoapp.war in tomcat webapp

7. Visit the application at: `http://localhost:8080/demoapp/ui/index.html`

### Database Configurtion

Install the Postgres Database.

Set the following environment variables to establish the database connectivity

```
DB_HOST={IP address of the Database Installed system}
DB_POSTGRES_PORT={Give the postges running port number}
DB_POSTGRES_DB={Provide the Database Name}
DB_POSTGRES_SCHEMA={Provide Postgres Schema}
DB_POSTGRES_USER={provide the postgres username}
DB_POSTGRES_PASSWORD={Provide the database password}

default values

DB_POSTGRES_PORT=5432
DB_POSTGRES_DB=demoappdb
DB_POSTGRES_SCHEMA=public
DB_POSTGRES_USER=demoapp
DB_POSTGRES_PASSWORD=demoapp

```
