# vuepload-files
Upload webapp using node and vuejs

Using proxies with webpack (great functionality) to avoid crossorigin problems (even the manageability in node)

!!! Carefull there is no check about security for the delete and download file !!!

## Init environement
```
npm i
cd frontend-src
npm i
```

## How to dev
```
npm run start //runs api

cd frontend-src
npm run dev //run the vue dev env (hot reload + proxies on /api and /placeholder)

open: http://localhost:8080/
```

## How to build and run in 'pseudo' prod
```
npm run start

cd frontend-src
npm run build //will build the app in the public folder shared by express

open: http://localhost:3000/
```

## Next steps

- Create a nice user interface to:
  - Add upload progress bar
  - upload through a drag and drop zone
  - manage files (add/delete)
