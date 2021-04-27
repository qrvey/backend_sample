pipeline {
    environment {
        MYSQL_HOST=credentials('MYSQL_HOST')
        MYSQL_USER=credentials('MYSQL_USER')
        MYSQL_PASSWORD=credentials('MYSQL_PASSWORD')
        MYSQL_TABLE_NAME=credentials('MYSQL_TABLE_NAME')
        MYSQL_DATABASE_NAME=credentials('MYSQL_DATABASE_NAME')

        DOMAIN=credentials('MANUAL_DOMAIN')
        API_KEY=credentials('MANUAL_API_KEY')
        NODE_ENV='development'
    }

    agent {
        docker {
            image 'node:fermium'
            args '-u 0:0'
        }
    }

    triggers {
        cron('@midnight')
    }

    stages {
        stage('Preparing workspace') {
            steps {
                sh 'chown -R 996:992 ./'
                sh 'chmod -R 777 ./'
                echo 'Creating services folder'
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run unit:test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}