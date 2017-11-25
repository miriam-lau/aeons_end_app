Setting up the Database:
1. Run psql as a Superuser.
2. Run "create role myapp with createdb login password '<password>'";
3. Run "rake db:migrate"
4. Run "rake db:setup"
5. Run "rake db:seed"

General
1. Run "npm install"

Setting up the Production Database (only need to do once):
1. Run "RAILS_ENV=production rake db:create" to create the production database.
2. Run "bundle exec rake db:migrate RAILS_ENV=production".
3. Run "bundle exec rake db:seed RAILS_ENV=production".

Pre-compile assets:
1. Run "rake assets:precompile", wait until complete before continuing with rest
of instructions.

Start Rails server in production mode:
1. Run "RAILS_ENV=production rake secret" and copy the key aka "code".
2. Open ~/.bashrc file.
3. Add "export SECRET_KEY_BASE=code" and save the file.
4. Run "source ~/.bashrc" to apply changes.
5. Run "rails server -e production" to start the server in production mode.

Production configurations in config/environments/production.rb:
1. Set config.public_file_server.enabled to true.
2. Set config.assets.compile to true.
