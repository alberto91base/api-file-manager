pipeline {
  agent any

  environment {
    CREDENTIALS_IP_PRE = credentials('IP_PRE')
    CREDENTIALS_IP_PRO1 = credentials('IP_PRO1')
    CREDENTIALS_IP_PRO2 = credentials('IP_PRO2')
    NAME_JOB_RESTART_PM2_SERVERS = credentials('NAME_JOB_RESTART_PM2_SERVERS')
    NAME_PROJECT = 'api-file-manager-v1'
  }

  stages {
    stage('npm install and test'){
      steps {
        sh '. ~/.nvm/nvm.sh && \
            nvm use && \
            npm i --silent '
      }
    }

    stage('deploy pre') {
      when {
        branch 'develop' 
      }
      steps {
        echo 'Inicia develop'
        sh 'ssh -o ConnectTimeout=10 jenkinsUser@$CREDENTIALS_IP_PRE "cd /data/lab.pre.rtve.es/home/html/$NAME_PROJECT/ && \
          git pull && \
          nvm use && \
          npm i --silent && \
          pm2 restart $NAME_PROJECT; exit"'
      }
    }

    stage('deploy pro1') {
      when {
        branch 'master' 
      }
      steps {
        echo 'Iniciar pro 1'
        sh 'ssh -o ConnectTimeout=10 jenkinsUser@$CREDENTIALS_IP_PRO1 "cd /data/lab.rtve.es/home/html/$NAME_PROJECT/ && \
          git pull && \
          nvm use && \
          npm i --silent && \
          pm2 restart $NAME_PROJECT; exit"'
      }
    }

    stage("Servers PRO restart pm2") {
      when {
        branch 'master' 
      }
      steps {
        echo "Build"
        build job: "$NAME_JOB_RESTART_PM2_SERVERS", parameters: [
          string(name: "NAME_PROCESS_PM2", value: "$NAME_PROJECT")
        ]
      }
    }

  }
}