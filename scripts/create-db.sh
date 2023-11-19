#!/bin/bash

SCRIPTS_DIR=`dirname "$0"`

db_user=$(grep DB_USER "$SCRIPTS_DIR/../.env" | cut -d '=' -f2)
db_pass=$(grep DB_PASS "$SCRIPTS_DIR/../.env" | cut -d '=' -f2)

sql=`cat "$SCRIPTS_DIR/../sql/create-db.sql"`

sudo -u postgres psql -c "$sql"
