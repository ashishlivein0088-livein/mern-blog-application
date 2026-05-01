pipeline{
    agent any
    stages{
      stage('Install dependencies') {
            steps {
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