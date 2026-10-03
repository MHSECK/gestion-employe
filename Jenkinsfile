pipeline {
    // deploiement ci-cd mono repo
    // agent any

    agent {
        label 'agent-windows'  
       
    }

    environment {
        DOCKERHUB_USER = "ditdevops1"
        BACKEND_IMAGE  = "backend-employe"
        FRONTEND_IMAGE = "frontend-employe"
        IMAGE_TAG      = "1.${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat "docker build -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} ./backend"
            }
        }


         stage('Build Frontend Image') {
            steps {
                bat "docker build -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                        docker push %DOCKERHUB_USER%/%BACKEND_IMAGE%:%IMAGE_TAG%
                        docker push %DOCKERHUB_USER%/%FRONTEND_IMAGE%:%IMAGE_TAG%
                    """
                }
            }
        }
    // stage docker compose
        stage('Deploy with Docker Compose') {
            steps {
                bat "docker-compose up -d --build"
            }
        }
    }

    post {
        success {
            echo "Déploiement Backend et Frontend Gestion employé réussiiiii !"
        }
        failure {
            echo "Le déploiement a échoué, vérifiez les logs Jenkinssss."
        }
    }
}
