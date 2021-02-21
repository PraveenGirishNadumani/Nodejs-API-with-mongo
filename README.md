# Nodejs-API-with-mongo

To run the app please follow the below steps.
1. clone the project, cd to the project dir
2. npm install
3. npm start

###APIs and their Uses.

1. baseURL+/uploadfile
->This endpoint takes CSV file as a inpute in the formate mentioned in files folders above. and uploads the data to mongoBD in a relational manner. which can be used in further to query the BD and get the data back. or aggregated data.

2. baseURL+/Policy
->this API returns the policy mapped against any user, by taking the first_name as a Input in the POST request body.

3. baseURL+/Policy/agent
->API returns the list of policy's which a perticular agents helped/referred the user to get the policy. Inpust agent_name in the POST request body.

4. baseURL+/Post
->API for uploading and retriving any post messages. if you make a http POST call alon with the message body, it'll be uploaded to the mongoBD cloude and if you make a http GET request without any body, the API will return the latest posts.
