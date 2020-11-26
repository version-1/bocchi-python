
## api

## mysql

```console
$ docker build . -t mysql-ja
$ docker run -v -d $PWD/data:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql-ja
```

