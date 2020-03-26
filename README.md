# Social App Client
This repository holds the source code for the client side of my social media site side project. The purpose of this project is to work with web development and ReactJS / AWS. The back end of this site uses AWS Lambda / API Gateway deliver resources. Authorization and API calls use AWS amplify.

Amplify requires config. Add file `src/config.js`

```
export default {
    s3: {
        REGION: "",
        BUCKET: ""
    },
    apiGateway: {
        REGION: "",
        URL: ""
    },
    cognito: {
        REGION: "",
        USER_POOL_ID: "",
        APP_CLIENT_ID: "",
        IDENTITY_POOL_ID: ""
    }
};
```