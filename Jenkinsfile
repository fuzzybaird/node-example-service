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
	stages {
		stage('Gather Release Info') {
			steps {
				container ('docker') {
					sh 'echo RUNNING_IN = ${RUNNING_IN}'
					sh 'printenv'
				}
			}
		}
		stage('Run Unit Tests') {
			steps {
				container ('node') {
					sh 'npm install'
					sh 'npm run test'
				}
			}
		}
		stage('Build-N-Push to ECR') {
			steps {
				login = sh(returnStdout: true, sh: 'aws ecr get-login').trim()
				// container ('docker') {
				// 	sh 'npm install'
				// 	sh 'npm run test'
				// }
			}       
		}
		// stage('Helm Deploy Feature') {}
		// stage('Helm Deploy Stage') {}
		// stage('Helm Deploy Prod') {}
	}
} // pipeline
