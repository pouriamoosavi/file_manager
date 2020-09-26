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
}
```
Install modules by runing `npm i`<br>
Change `YOUR_PORT` (e.g: 8081) and `WHERE_FILE_MANAGER_CONSIDER_AS_ROOT` (e.g: /home/foo/Desktop) with what you want.<br>
Run the project with `npm run start`





