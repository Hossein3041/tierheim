#!/bin/bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
LOG="$SCRIPT_DIR/install_log.txt"

PROFILE_NAME="sideklick"
LINUX_AWS_CLI_INSTALL_PATH="/opt/aws-sam-cli/"
LINUX_AWS_CLI_DOWNLOAD_URL="https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip"
LINUX_AWS_CLI_DOWNLOAD_FILENAME="awscliv2.zip"

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

function install_node_linux() {
  # from https://nodejs.org/en/download/package-manager 27.09.2024
  # installs nvm (Node Version Manager)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

  # download and install Node.js (you may need to restart the terminal)
  nvm install 22

  # verifies the right Node.js version is in the environment
  node -v # should print `v22.9.0`
  if [[ $? -ne 0 ]]; then
    echo "Failed to install node"
  fi

  # verifies the right npm version is in the environment
  npm -v # should print `10.8.2`
  if [[ $? -ne 0 ]]; then
    echo "Failed to install node"
  fi

}

function install_node_mac() {
  brew install node >/dev/null 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to install node!"
    exit 1
  fi
  source "$HOME/.zprofile"
}

function install_node() {
  if ! command -v npm >/dev/null 2>&1; then
    echo "node is not installed!"
    echo "Installing node..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
      install_node_linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
      install_node_mac
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
  install_node
  install_aws_cli
  create_aws_profile
}

run
