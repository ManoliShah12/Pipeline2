pipeline {
    agent any
    tools {
        nodejs "NodeJs"
    }
    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    // Remove the entire workspace
                    deleteDir()
                }
            }
        }

        stage('Environment') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/ManoliShah12/Pipeline2.git']]])
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm -v' 
                sh 'npm run build' 
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Start Development Server') {
            steps {
                sh 'npm start &' 
                sleep time: 30, unit: 'SECONDS' // Wait for the server to start (adjust the sleep time as needed)
            }
        }
    }

    post {
        always {
            sh 'pkill -f "npm start"'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
