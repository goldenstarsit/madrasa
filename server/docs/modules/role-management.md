# Role Management System

## Overview

Role Management System controls application roles and provides the foundation for authorization.

## Architecture

Layers:

- Types
- Repository
- Service
- Validation
- Routes
- HTTP Response Models

## Features

- Create role
- Read role
- Update role
- Delete role
- Role validation
- Protected system roles
- Standard error handling

## Validation Rules

- Role name is required
- Minimum length: 3 characters
- Maximum length: 100 characters
- Protected roles cannot be deleted

## Protected Roles

- ADMIN
- SUPER_ADMIN

