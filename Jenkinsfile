#!/usr/bin/env groovy

def buildEnvironment = 'dev' // This will always start as dev and then change as the pipeline progresses
def version = ""
def branch = ""
def redirectUri = ""

pipeline {
	agent {
			kubernetes {
				defaultContainer 'jnlp'
				yamlFile 'pod-template.yml'
			} // kubernetes
	} // agent
	environment {
		AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
		AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
		AWS_DEFAULT_REGION    = 'us-west-2'
	}
	stages {
		stage('Gather Release Info') {
			steps {
					sh 'printenv'
			}
		}
		stage('Run Unit Tests') {
			steps {
				container ('node') {
					// sh 'echo RUNNING_IN = ${RUNNING_IN}'
					sh 'npm install'
					sh 'npm run test'
				}
			}
		}
		stage('Build-N-Push to ECR') {
			steps {
				script {
					container ('aws-cli') {
						dockerlogin = sh (script: "aws ecr get-login --no-include-email", returnStdout: true)
					}
					container ('docker') {
						sh ("${dockerlogin}")
						sh ("docker build -t 276042987041.dkr.ecr.us-west-2.amazonaws.com/node-example-service:${GIT_COMMIT}-hash .")
						sh ("docker push 276042987041.dkr.ecr.us-west-2.amazonaws.com/node-example-service:${GIT_COMMIT}-hash")
					}
				}
			}       
		}
		stage('Helm Deploy Feature') {
			steps {
				container ('helm') {
					sh "/helm init --client-only --skip-refresh"
					sh "/helm upgrade --install --force --wait \
						--set image.repository='276042987041.dkr.ecr.us-west-2.amazonaws.com/node-example-service' \
						--set image.tag='${GIT_COMMIT}-hash' \
						--set vgateway.host='sre.aws.chgit.com' \
						--name node-example-service \
						./deployment"
				}
			}
		}
		// stage('Helm Deploy Stage') {}
		// stage('Helm Deploy Prod') {}
	}
} // pipeline
