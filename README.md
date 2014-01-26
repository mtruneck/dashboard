Dashboard
=========

Dashboard is a Django application using Gridster library for displaying several web pages on one.

The public demo can be seen here: http://dashboard-giat.rhcloud.com 

Deploying on OpenShift
----------------------

Just a few steps:

    # Register here: https://www.openshift.com/app/account/new
    # Install rhc tool (e.g. on Fedora yum install rubygem-rhc )
    $ rhc app-create dashboard python-2.7
    $ cd newdash/

    $ cp -r DASHBOARD_CLONED_GIT/* wsgi/
    $ cp wsgi/openshift/application wsgi/
    $ cp wsgi/openshift/setup.py .
    $ cp -r wsgi/core/static/* wsgi/static/

    $ git add wsgi/*
    $ git commit -am "Initial Dashboard commit"
    $ git push

Then your dashboard will be ready as dashboard-yournamespace.rhcloud.com


