# Terraform configuration for AWS provider and key pair resource
provider "aws" {
  region = "us-east-1"
}

# Fetch the latest Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true

  # Filter for the specific image name pattern
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  # 099720109477 is the official AWS Account ID for Canonical
  owners = ["099720109477"] 
}

# Create an AWS key pair for Jenkins
resource "aws_key_pair" "jenkins_key" {
  key_name   = "jenkins_key"
  public_key = file("~/.ssh/id_ed25519.pub")
}

# Create a security group for the Jenkins server
resource "aws_security_group" "jenkins-server-sg" {
  name        = "jenkins-server-sg"
  description = "Security group for Jenkins server"

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    description = "Allow Jenkins web interface"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    description = "Allow SSH access"
    cidr_blocks = ["106.222.208.66/32"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    description = "Allow all outbound traffic"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an EC2 instance for the Jenkins server
resource "aws_instance" "jenkins-server" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = "t3.small"
  key_name        = aws_key_pair.jenkins_key.key_name
  security_groups = [aws_security_group.jenkins-server-sg.name]

  tags = {
    Name = "Jenkins-Server"
  }
}
# Output the selected AMI ID
output "selected_ami" {
  value = data.aws_ami.ubuntu.id
}

# Output the Jenkins server URL
output "jenkins_url" {
  value = "http://${aws_instance.jenkins-server.public_ip}:8080"
}
