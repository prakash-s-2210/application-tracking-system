# Application Tracking System - API and UI

## Application Form API Documentation

**Version:** 1.0

**Description:** API Task

Base URL: http://127.0.0.1:3100

Endpoints:

1. Retrieve Application Form

URL: /api/{version}/programs/{programId}/application-form
HTTP Method: GET
Description: Retrieve application form.
Parameters:
programId (Path Parameter)
Type: string
Required: true
version (Path Parameter)
Type: number
Required: true
Response:
Status 200 (OK)
Content Type: application/json
Schema:
$ref: '#/components/schemas/ApplicationForm'
2. Upsert Application Form

URL: /api/{version}/programs/{programId}/application-form
HTTP Method: PUT
Description: Upsert (update or insert) application form.
Parameters:
programId (Path Parameter)
Type: string
Required: true
version (Path Parameter)
Type: number
Required: true
Request Body:
Content Type: application/json
Schema:
$ref: '#/components/schemas/ApplicationForm'
Response:
Status 204 (No Content)
Data Schemas:

1. ApplicationForm

Type: object
Properties:
data (object)
Properties:
id (string)
Type: string
Format: uuid
type (string)
Type: string
Default: applicationForm
attributes (object)
$ref: '#/components/schemas/ApplicationFormAttributes'
Required Properties: data
2. ApplicationFormAttributes

Type: object
Properties:
coverImage (string)
Type: string
Format: uri
Default: ""
personalInformation (object)
Properties:
... (see below for nested properties)
profile (object)
Properties:
... (see below for nested properties)
customisedQuestions (array)
Type: array
Default: []
Items:
$ref: '#/components/schemas/QuestionTemplate'
Required Properties: personalInformation
3. PersonalInformationTemplate

Type: object
Properties:
internalUse (boolean)
Type: boolean
Default: false
show (boolean)
Type: boolean
Default: true
Required Properties: internalUse, show
4. ProfileTemplate

Type: object
Properties:
mandatory (boolean)
Type: boolean
Default: true
show (boolean)
Type: boolean
Default: true
Required Properties: mandatory, show
5. QuestionTemplate

Type: object
Properties:
id (string)
Type: string
type (string)
Type: string
Enum:
Paragraph
ShortAnswer
YesNo
Dropdown
MultipleChoice
Date
Number
FileUpload
Video
... (other properties for specific question types)



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
