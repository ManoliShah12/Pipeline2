pipeline {
    agent any
 tools {
        nodejs "NodeJs" // Use the name you configured in step 2
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ManoliShah12/Pipeline2.git'
            }
        }

        stage('Build and Test') {
            steps {
              script {
            // Restore npm cache if available
            dir('C:\Users\pmano\task-scheduler-website') {
                def npmCache = tool name: 'NodeJs', type: 'npm'
                sh "${npmCache}/bin/npm ci --cache .npm"
            }
            }
  }
 }
}
