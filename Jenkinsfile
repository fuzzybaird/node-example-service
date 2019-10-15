#!/usr/bin/env groovy

def buildEnvironment = 'dev' // This will always start as dev and then change as the pipeline progresses
def version = ""
def branch = ""
def redirectUri = ""

pipeline {
  agent {
    kubernetes {
      defaultContainer 'jnlp'
      yaml '''
metadata:
  labels:
    some-label: some-label-value
spec:
  containers:
  - name: jnlp
    env:
    - name: CONTAINER_ENV_VAR
      value: jnlp

  - name: docker
    image: docker:18.02
    env:
    - name: CONTAINER_ENV_VAR
      value: jnlp
    command:
    - cat
    tty: true
    resources:
      requests:
        memory: "1024Mi"
        cpu: "500m"
      limits:
        memory: "2048Mi"
        cpu: "1000m"

  - name: busybox
    image: busybox
    command:
    - cat
    tty: true
    env:
    - name: CONTAINER_ENV_VAR
      value: busybox

'''
    } // kubernetes
  } // agent
  stages {
    stage('capture branch & release info') {
      steps {
        container ('docker') {
          sh 'echo RUNNING_IN = ${RUNNING_IN}'
        }
      }
    }
  }
} // pipeline
