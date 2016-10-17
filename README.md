# Cloud Compiler API

Cloud Compiler API is the only free API which compiles the source code provided by the user in the cloud and returns the output. 

Advantages:
 - supports 70+ programming languages
 - no authorization key is required 

> This is the minified documentation to get familiar with the API. For full documentation, please visit the [original one](http://cloudcompiler.esy.es/docs/). 

### Introduction

All API URLs listed in this documentation are relative to [this](http://cloudcompiler.esy.es/api/). The Cloud Compiler API is a mostly RESTful API. 

Known caveats:
- all API calls should be made with HTTP GET or POST
- you can consider any non-200 HTTP response code as an error
- when you use the submissions method and status is not equal to 0 then you should wait 3-5 seconds and call the method again
- error codes are not same as HTTP error codes

### Usage

##### Get all supported languages

This endpoint retrieves all the programming languages that are supported by this API.

```sh
curl "http://cloudcompiler.esy.es/api/languages"
```

##### Get the language template

This endpoint retrieves the template for the specified language.

```sh
curl "http://cloudcompiler.esy.es/api/languages/template/13"
```

##### Get the language sample code

This endpoint retrieves the sample code for the specified language

```sh
curl "http://cloudcompiler.esy.es/api/languages/sample/13"
```

##### Create a new submission

This endpoint submits the source code to the API.

```sh
curl -H "Content-Type: application/json" \
-d '{ 
      "sourceCode": "# This is how submission looks like",
      "langId": 63,
      "stdin": "sample input",
      "timeLimit": 1
    }' \
-X POST \
'http://cloudcompiler.esy.es/api/submissions/'
```

##### Get the submission status

This endpoint fetches the submission status.

```sh
curl "http://cloudcompiler.esy.es/api/submissions/FrnO2h"
```

### Table of contents in full documentation

- [Get all supported languages](http://cloudcompiler.esy.es/docs/#get-all-supported-languages)
- [Get the language template](http://cloudcompiler.esy.es/docs/#get-the-language-template)
- [Get the language sample code](http://cloudcompiler.esy.es/docs/#get-the-language-sample-code)
- [Create a new submission](http://cloudcompiler.esy.es/docs/#create-a-new-submission)
- [Get the submission status](http://cloudcompiler.esy.es/docs/#get-the-submission-status)
- [Status](http://cloudcompiler.esy.es/docs/#status)
- [Result](http://cloudcompiler.esy.es/docs/#result)
- [Errors](http://cloudcompiler.esy.es/docs/#errors)
