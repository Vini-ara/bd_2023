#!/bin/bash

SCRIPTS_DIR=`dirname "$0"`

db_user=$(grep DB_USER "$SCRIPTS_DIR/../.env" | cut -d '=' -f2)
db_pass=$(grep DB_PASS "$SCRIPTS_DIR/../.env" | cut -d '=' -f2)

sql=`cat "$SCRIPTS_DIR/../sql/schema.sql"`

PGPASSWORD=$db_pass psql -U $db_user -d trabalhobd -p 5432 -h localhost -c "$sql"
