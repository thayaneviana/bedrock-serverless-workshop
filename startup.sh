#!/bin/bash
echo "Preparing for project deploymnet"

echo "Set region"
export AWS_REGION=$(aws configure get region)
echo "AWS Region is $AWS_REGION"

echo "Export few more parameters from the sam stack output"
export BedrockApiUrl=
export UserPoolId=
export UserPoolClientId=
export SecretName=
echo "API Gateway endpoint: $BedrockApiUrl"
echo "Cognito user pool id: $UserPoolId"
echo "Cognito client id: $UserPoolClientId"
echo "Secret name: $SecretName"

#Pre req for frontend setup
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

#Install Ampliyfy and build frontend
#this export to fix the npm installation issue
export UV_USE_IO_URING=0
cd /home/ec2-user/environment/bedrock-serverless-workshop/frontend
npm i -S @vue/cli-service
npm i @vue/cli-plugin-babel -D
npm i -g @aws-amplify/cli
npm install
npm run build
cp ~/.aws/credentials ~/.aws/config

#Amplify initialization
echo "Amplify initialization"
mv dist build
amplify init --yes

echo "Add hosting, hit enter key if it prompts for action, use default"
amplify add hosting --parameters parameters.json

echo "Publish the amplify project"
amplify publish --yes

echo "Save the user_id and password to login to UI"
aws secretsmanager get-secret-value --secret-id $SecretName | jq -r .SecretString
