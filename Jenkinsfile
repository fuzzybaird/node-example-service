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
				container ('docker') {
					sh 'echo RUNNING_IN = ${RUNNING_IN}'
					// sh 'printenv'
				}
			}
		}
		stage('Run Unit Tests') {
			steps {
				container ('node') {
					// sh 'echo RUNNING_IN = ${RUNNING_IN}'
					// sh 'npm install'
					// sh 'npm run test'
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
						sh ("docker build -t 276042987041.dkr.ecr.us-west-2.amazonaws.com/node-example-service .")
					}
				}
			}       
		}
		// stage('Helm Deploy Feature') {}
		// stage('Helm Deploy Stage') {}
		// stage('Helm Deploy Prod') {}
	}
} // pipeline
