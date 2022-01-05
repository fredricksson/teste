pipeline {
    environment {
      registry = "ubimoz/test-service"
      registryCredential = 'dockerhub'
      dockerImage = ''
    }

   agent any

    stages {
        stage('Checkout from version control') {
            steps {
              checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: '01b05843-6eb7-4c35-b5fb-454317f29df9', url: 'https://github.com/fredricksson/txeda-app/']]])
            }
        }

        stage('Initialize'){
            def dockerHome = tool 'myDocker'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }

        stage('Docker build') {
            steps {
                script {
                  dockerImage = docker.build("${registry}")
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                script {
                  docker.withRegistry('', registryCredential) {
                    dockerImage.push()
                  }
                }
            }
        }

        stage('Remove Unused docker image') {
            steps{
              sh "docker rmi $registry"
            }
        }
    }
}