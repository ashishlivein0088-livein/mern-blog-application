pipeline{
    agent any
    
    tools {
        nodejs 'node-24.4.1'
    }
    
    stages{
        stage('Install Dependencies') {
            steps {
                echo '============ Installing dependencies for backend... ============'
                dir('backend') {
                    sh 'npm ci'
                }
                echo '============ Installing dependencies for frontend... ============'
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }
        stage('Lint') {
            steps {
                echo '============ Running linting for backend... ============'
                dir('backend') {
                    sh 'npm run lint'
                }
                echo '============ Running linting for frontend... ============'
                dir('frontend') {       
                    sh 'npm run lint'
                }
            }
        }
        stage('Test') {
            steps {
                echo '============ Running tests for backend... ============'
                dir('backend') {
                    sh 'npm test'
                }
                echo '============ Running tests for frontend... ============'
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }
        stage('Unit Tests') {
            steps {
                echo '============ Running unit tests for backend... ============'
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                echo '============ Building frontend... ============'
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        stage('Security Scan') {
            steps {
                echo '============ Running security scan for backend... ============'
                dir('backend') {
                    sh 'npm audit --audit-level=high'
                }
            }
        }
        stage('Package') {
            steps {
                echo '============ Packaging application... ============'
                sh 'tar -czf app.tar.gz backend frontend'
            }
        }
    }
}