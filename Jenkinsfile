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
    stage('Run Unit Tests') {}
    stage('Build-N-Push to ECR') {}
    stage('Helm Deploy Feature Env') {}
    stage('Helm Deploy Stage Env') {}
    stage('Helm Deploy prod Env') {}
  }
} // pipeline
