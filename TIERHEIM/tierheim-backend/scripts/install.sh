#!/bin/bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
LOG="$SCRIPT_DIR/install_log.txt"

LINUX_YQ_INSTALL_PATH="/usr/bin/yq"
LINUX_YQ_DOWNLOAD_URL="https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64"
LINUX_AWS_CLI_INSTALL_PATH="/opt/aws-sam-cli/"
LINUX_AWS_CLI_DOWNLOAD_URL="https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip"
LINUX_AWS_CLI_DOWNLOAD_FILENAME="awscliv2.zip"

PARAMETERS_CONFIG_DIR="$SCRIPT_DIR/../cloudformation"
PARAMETERS_CONFIG_FILENAME="config.yaml"
PARAMETERS_CONFIG_FILE="$PARAMETERS_CONFIG_DIR/$PARAMETERS_CONFIG_FILENAME"

# Nur für Mac den brew package-manager installieren
function install_brew() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if ! command -v brew >/dev/null 2>&1; then
      echo "brew is not installed!"
      echo "Installing brew..."
      bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      if [[ $? -ne 0 ]]; then
        echo "Failed to install brew!"
        exit 1
      fi
      (
        echo
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"'
      ) >>"$HOME/.zprofile"
      eval "$(/opt/homebrew/bin/brew shellenv)"
      source "$HOME/.zprofile"
    fi
  fi
}

function install_yq_linux() {
  sudo wget "$LINUX_YQ_DOWNLOAD_URL" -O "$LINUX_YQ_INSTALL_PATH" >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to download yq!"
    exit 1
  fi
  sudo chmod +x "$LINUX_YQ_INSTALL_PATH" >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to set Permissions for yq!"
    exit 1
  fi
}

function install_yq_mac() {
  brew install yq >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install yq!"
    exit 1
  fi
  source "$HOME/.zprofile"
}

# yq installieren falls noch nicht vorhanden.
function install_yq() {
  if ! command -v yq >/dev/null 2>&1; then
    echo "yq is not installed!"
    echo "Installing yq..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
      install_yq_linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
      install_yq_mac
    fi
  fi
}

function install_jq_linux() {
  sudo apt install jq >>"$LOG" 2>&1
  jq --version >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed installing jq"
  fi
}

function install_jq_mac() {
  brew install jq >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install jq!"
    exit 1
  fi
  source "$HOME/.zprofile"
}

# yq installieren falls noch nicht vorhanden.
function install_jq() {
  if ! command -v jq >/dev/null 2>&1; then
    echo "jq is not installed!"
    echo "Installing jq..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
      install_jq_linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
      install_jq_mac
    fi
  fi
}

function install_java_linux() {
  sudo apt install openjdk-21-jdk >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install java"
    exit 1
  fi
}

function install_java_mac() {
  brew install openjdk@21 >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install java!"
    exit 1
  fi
  source "$HOME/.zprofile"
}

# java installieren falls noch nicht vorhanden.
function install_java() {
  if ! command -v java >/dev/null 2>&1; then
    echo "Java is not installed!"
    echo "Installing java..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
      install_java_linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
      install_java_mac
    fi
  fi
}

function install_docker_linux() {
  # from https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository 27.09.2024
  # Add Docker's official GPG key:
  sudo apt update >>"$LOG" 2>&1
  sudo apt -y install ca-certificates curl >>"$LOG" 2>&1
  sudo install -m 0755 -d /etc/apt/keyrings >>"$LOG" 2>&1
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc >>"$LOG" 2>&1
  sudo chmod a+r /etc/apt/keyrings/docker.asc >>"$LOG" 2>&1

  # Add the repository to Apt sources with $UBUNTU_CODENAME instead of $VERSION_CODENAME to work with linux mint:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$UBUNTU_CODENAME") stable" |
    sudo tee /etc/apt/sources.list.d/docker.list >/dev/null >>"$LOG" 2>&1
  sudo apt update >>"$LOG" 2>&1

  sudo apt -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin >>"$LOG" 2>&1

  sudo docker run hello-world >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install docker"
  fi
}

function install_docker_mac() {
  brew install --cask docker >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install docker!"
    exit 1
  fi
  source "$HOME/.zprofile"
}

# docker installieren falls noch nicht vorhanden.
function install_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "docker is not installed!"
    echo "Installing docker..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
      install_docker_linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
      install_docker_mac
    fi
  fi
}

function install_aws_cli_linux() {
  if ! command -v unzip >/dev/null 2>&1; then
    echo "Unzip is not installed!"
    echo "Installing Unzip..."
    sudo apt install unzip >>"$LOG" 2>&1
  fi
  echo "AWS-CLI is not installed!"
  echo "Installing AWS-CLI..."
  sudo mkdir $LINUX_AWS_CLI_INSTALL_PATH >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to create AWS-CLI installation Path!"
    exit 1
  fi
  cd "$LINUX_AWS_CLI_INSTALL_PATH" >>"$LOG" 2>&1
  sudo curl -s "$LINUX_AWS_CLI_DOWNLOAD_URL" -o "$LINUX_AWS_CLI_DOWNLOAD_FILENAME" >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to download AWS-CLI installation files!"
    exit 1
  fi
  sudo unzip "$LINUX_AWS_CLI_DOWNLOAD_FILENAME" >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to unzip installation files!"
    exit 1
  fi
  sudo rm "$LINUX_AWS_CLI_DOWNLOAD_FILENAME" >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to remove installation files!"
    exit 1
  fi
  sudo ./aws/install >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install AWS-CLI!"
    exit 1
  fi
  cd "$SCRIPT_DIR" >>"$LOG" 2>&1
}

function install_aws_cli_mac() {
  brew install awscli >>"$LOG" 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install AWS-CLI!"
    exit 1
  fi
  source "$HOME/.zprofile"
}

# AWS-CLI Installieren, wenn nicht vorhanden.
function install_aws_cli() {
  if ! command -v aws >/dev/null 2>&1; then
    echo "aws-cli is not installed!"
    echo "Installing AWS-CLI..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
      install_aws_cli_linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
      install_aws_cli_mac
    fi
  fi
}

# AWS-CLI Profil anlegen, wenn nicht vorhanden.
function create_aws_profile() {
  if ! aws configure list-profiles | grep -q "^$PROFILE_NAME$"; then
    echo "Profile $PROFILE_NAME does not exists!"
    if [[ "$ACCESS_KEY" = "" ]] || [[ "$SECRET_KEY" = "" ]]; then
      # Tritt ein, wenn der User das Script aufruft.
      echo "Please enter AWS Details for Profile $PROFILE_NAME:"
      aws configure --profile "$PROFILE_NAME"
      if [[ $? -ne 0 ]]; then
        echo "Failed to configure AWS!"
        exit 1
      fi
    else
      # Tritt ein, wenn GitHub-Actions das Script aufrufen.
      echo "Creating profile..."
      aws configure set aws_access_key_id "$ACCESS_KEY" --profile "$PROFILE_NAME" >>"$LOG" 2>&1
      if [[ $? -ne 0 ]]; then
        echo "Failed to configure AWS access_key!"
        exit 1
      fi
      aws configure set aws_secret_access_key "$SECRET_KEY" --profile "$PROFILE_NAME" >>"$LOG" 2>&1
      if [[ $? -ne 0 ]]; then
        echo "Failed to configure AWS secret_key!"
        exit 1
      fi
      aws configure set region eu-central-1 --profile "$PROFILE_NAME" >>"$LOG" 2>&1
      if [[ $? -ne 0 ]]; then
        echo "Failed to configure AWS region!"
        exit 1
      fi
    fi
  fi
}

function run() {
  echo "Log install.sh $(date -Iseconds):" >"$LOG"
  echo "Setup..."
  echo "Installing dependencies..."
  install_brew
  install_yq
  install_jq
  PROFILE_NAME=$(yq -e '.ProfileName' "$PARAMETERS_CONFIG_FILE")
  install_java
  install_docker
  install_aws_cli
  create_aws_profile
}

run
