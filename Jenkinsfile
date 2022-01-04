pipeline {
    environment {
      registry = "ubimoz/loyalty-store:latest"
      registryCredential = 'ubimoz-docker-id'
      dockerImage = ''
    }

   agent any

    stages {
        stage('Checkout from version control') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'bitbucker-ssh-key', url: 'git@bitbucket.org:loyalty-engine/company-service.git']]])
            }
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