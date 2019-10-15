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
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: some-label-value
spec:
  containers:
  - name: 'jnlp'
    image: 'jenkins/jnlp-slave:3.27-1-alpine'
    tty: true
    resources:
      requests:
        memory: "1024Mi"
        cpu: "500m"
      limits:
        memory: "2048Mi"
        cpu: "1000m"
    volumeMounts:
      - name: dockersock
        mountPath: "/var/run/docker.sock"

  - name: 'docker'
    image: 'docker:18.02'
    env:
    - name: RUNNING_IN
      value: "docker"
    tty: true
    resources:
      requests:
        memory: "1024Mi"
        cpu: "500m"
      limits:
        memory: "2048Mi"
        cpu: "1000m"
    volumeMounts:
      - name: dockersock
        mountPath: "/var/run/docker.sock"

  - name: 'helm'
    image: 'ibmcom/k8s-helm:v2.6.0'
    tty: true
    resources:
      requests:
        memory: "1024Mi"
        cpu: "500m"
      limits:
        memory: "2048Mi"
        cpu: "1000m"
    volumeMounts:
      - name: dockersock
        mountPath: "/var/run/docker.sock"
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock

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
