pipeline{
    agent any
    
    tools {
        nodejs 'node-18'
    }
    
    stages{
      stage('Install dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                
                dir('frontend') {
                    sh 'npm ci'
                }
                
                dir('backend'){
                    sh 'npm ci'
                }
            }
        }
    }
}