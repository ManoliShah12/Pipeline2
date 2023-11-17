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
                //tool name: 'NodeJs', type: 'nodejs'
       //         sh "${npmhome}/bin/npm install"          // Install project dependencies
         //       sh "${npmhome}/bin/npm run build"        // Build the React project
           //     sh  "${npmhome}/bin/npm test"             // Run tests if applicable
       sh 'npm install'          // Install project dependencies
                sh 'npm run build'        // Build the React project
                sh  'npm test'             // Run tests if applicable
            }
  }
 }
}
