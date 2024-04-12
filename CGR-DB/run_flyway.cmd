ECHO OFF
set FLYWAY_HOME=C:\Users\mikey\DevTools\flyway-10.7.1

@REM This command will allow paramters to be passed such as info or migrate
%FLYWAY_HOME%\flyway.cmd -configFiles="./conf/flyway_sqlite.conf" %1 %2 %3 %4