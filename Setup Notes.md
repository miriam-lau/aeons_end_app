Setting up the Database:
1. Run psql as a Superuser.
2. Run "create role myapp with createdb login password '<password>'";
3. Run "rake db:migrate"
4. Run "rake db:setup"

General
1. Run "npm install"
