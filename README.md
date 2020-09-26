# file_manager
# Under construction

nodejs express file browser and manager. 

## Dependencies
- nodejs > 12 with npm: https://nodejs.org

## Usage
Clone project. Create a `config.js` file in the root of project and paste following code into it:
```js
module.exports = {
  port: YOUR_DESIRED_PORT,
  root: 'WHERE_FILE_MANAGER_CONSIDER_AS_ROOT',
  sessionSecret: 'SOME_RANDOM_STRING'
}
```
Change `YOUR_PORT` (e.g: 8081), `WHERE_FILE_MANAGER_CONSIDER_AS_ROOT` (e.g: /home/foo/Desktop) and `SOME_RANDOM_STRING` (e.g: secret).<br>
Install modules by runing `npm i`<br>
Run the project with `npm run start`

## TODO
- Button to download whole folder.
- Upload files and folders
- Favorite folders and show them in left panel
- Download multiple files
- Delete and move files
- Sort files based on different things



