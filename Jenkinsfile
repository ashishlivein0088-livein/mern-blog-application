pipeline{
    agent any
    
    tools {
        nodejs 'node-24.4.1'
    }
    
    stages{
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }
        stage('Lint') {
            steps {
                dir('backend') {
                    sh 'npm run lint'
                }
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }
        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }
        stage('Unit Tests') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        stage('Security Scan') {
            steps {
                dir('backend') {
                    sh 'npm audit --audit-level=high'
                }
            }
        }
        stage('Package') {
            steps {
                sh 'tar -czf app.tar.gz backend frontend'
            }
        }
    }
}