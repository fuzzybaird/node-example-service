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
    stage('capture branch & release info') {
      steps {
        sh 'printenv'
        container ('docker') {
          sh 'echo RUNNING_IN = ${RUNNING_IN}'
          sh 'printenv'
        }
      }
    }
  }
} // pipeline
