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
		PROJECT               = '###NOT_DEFINED###'
		IS_FEATURE            = 'false'
		IS_MASTER             = 'false'
	}
	stages {
		stage('Gather Release Info') {
			steps {
				script {
				    sh 'printenv'
					IS_FEATURE = (GIT_BRANCH =~ /^([fF]eature|[bB]ug|[wW]arm[fF]ix|hot[fF]ix)\/[a-zA-Z]+-[0-9]+/) ? 'true' : 'false'
					IS_MASTER = (GIT_BRANCH =~ /master/) ? 'true' : 'false'
					PROJECT = sh (script: "./bin/getprojectname.sh", returnStdout: true).trim()
					echo "PROJECT:${PROJECT}"
					echo "IS_FEATURE:${IS_FEATURE}"
					echo "IS_MASTER:${IS_MASTER}"
				}
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
						sh ("docker build -t 276042987041.dkr.ecr.us-west-2.amazonaws.com/${PROJECT}:${GIT_COMMIT} .")
						sh ("docker push 276042987041.dkr.ecr.us-west-2.amazonaws.com/${PROJECT}:${GIT_COMMIT}")
					}
				}
			}       
		}
		stage('Helm Deploy Feature') {
			when { expression { return "yes" == IS_FEATURE } }
			steps {
				container ('helm') {
					sh "/helm init --client-only --skip-refresh"
					sh "/helm upgrade --install --force --wait \
						--set image.repository='276042987041.dkr.ecr.us-west-2.amazonaws.com/${PROJECT}' \
						--set image.tag='${GIT_COMMIT}' \
						--set vgateway.host='sre.aws.chgit.com' \
						${PROJECT} \
						./deployment"
				}
			}
		}
		stage('Helm Deploy Stage') {
			when { expression { return "yes" == IS_MASTER } }
			steps {
				container ('helm') {
					sh "/helm init --client-only --skip-refresh"
					sh "/helm upgrade --install --force --wait \
						--set image.repository='276042987041.dkr.ecr.us-west-2.amazonaws.com/${PROJECT}' \
						--set image.tag='${GIT_COMMIT}' \
						--set vgateway.host='sre.aws.chgit.com' \
						${PROJECT} \
						./deployment"
				}
			}
		}
		// stage('Helm Deploy Prod') {}
	}
} // pipeline
