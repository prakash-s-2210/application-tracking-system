# Application Tracking System - API and UI

## Application Form API Documentation

**Version:** 1.0

**Description:** API Task

**Base URL:** http://127.0.0.1:3100

### Endpoints:

### 1. Retrieve Application Form

* **URL:** `/api/{version}/programs/{programId}/application-form`
* **HTTP Method:** GET
* **Description:** Retrieve application form.
* **Parameters:**
  * **programId** (Path Parameter)
    * Type: string
    * Required: true
* **version** (Path Parameter)
  * Type: number
  * Required: true
* **Response:**
  * Status 200 (OK)
    * Content Type: application/json
    * Schema:
      * `$ref: '#/components/schemas/ApplicationForm'`
        
### 2. Upsert Application Form

* **URL:** `/api/{version}/programs/{programId}/application-form`
* **HTTP Method:** PUT
* **Description:** Upsert (update or insert) application form.
* **Parameters:**
  * **programId** (Path Parameter)
    * Type: string
    * Required: true
  * **version** (Path Parameter)
    * Type: number
    * Required: true
* **Request Body:**
  * Content Type: application/json
  * Schema:
    * $ref: `'#/components/schemas/ApplicationForm'`
* **Response:**
  * Status 204 (No Content)
 
### Data Schemas:

### 1. ApplicationForm

* Type: object
* Properties:
  * **data** (object)
    * Properties:
      * **id** (string)
        * Type: string
        * Format: uuid
      * **type** (string)
        * Type: string
        * Default: applicationForm
      * **attributes** (object)
        * `$ref: '#/components/schemas/ApplicationFormAttributes'`
* Required Properties: data
  
### 2. ApplicationFormAttributes

* Type: object
* Properties:
  * **coverImage** (string)
    * Type: string
    * Format: uri
    * Default: ""
  * **personalInformation** (object)
    * Properties:
      * ... (see below for nested properties)
  * **profile** (object)
    * Properties:
      * ... (see below for nested properties)
  * customisedQuestions (array)
    * Type: array
    * Default: []
    * Items:
      * `$ref: '#/components/schemas/QuestionTemplate'`
* Required Properties: **personalInformation**
  
### 3. PersonalInformationTemplate

* Type: object
* Properties:
  * **internalUse** (boolean)
    * Type: boolean
    * Default: false
  * **show** (boolean)
    * Type: boolean
    * Default: true
* Required Properties: internalUse, show

4. ProfileTemplate

* Type: object
* Properties:
  * **mandatory** (boolean)
    * Type: boolean
    * Default: true
  * **show** (boolean)
    * Type: boolean
    * Default: true
* Required Properties: mandatory, show

## 5. QuestionTemplate

* Type: object
* Properties:
  * **id** (string)
    * Type: string
  * **type** (string)
    * Type: string
    * Enum:
      * Paragraph
      * ShortAnswer
      * YesNo
      * Dropdown
      * MultipleChoice
      * Date
      * Number
      * FileUpload
      * Video
  * ... (other properties for specific question types)



## Live Site

  [Application Tracking System](https://ats-pro-hire.netlify.app/)

## Screenshots

https://github.com/prakash-s-2210/application-tracking-system/assets/94909544/6eabe32e-10ee-4af0-a27f-0a03a89cbe3a

(https://github.com/prakash-s-2210/application-tracking-system/assets/94909544/b713d23a-f23f-4c3d-bf33-c0495ec2d2d4)

