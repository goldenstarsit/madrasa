# User Management System

## Overview

User Management System manages application users and provides the foundation for authentication and authorization.

## Architecture

Layers:

- Types
- Repository
- Service
- Validation
- Routes
- HTTP Response Models

## Features

- Create user
- Read user
- Update user
- Delete user
- Username validation
- Email validation
- Duplicate username protection
- Duplicate email protection
- Protected system users
- Standard error handling

## Validation Rules

- Username is required
- Username minimum length: 3 characters
- Username maximum length: 50 characters
- Email must be valid when provided
- Password hash is required
- Username must be unique
- Email must be unique

## Protected Users

- ADMIN
- SUPER_ADMIN
