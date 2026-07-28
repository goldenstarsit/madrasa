# Student Management System

## Overview

Student Management System manages madrasa students and provides the foundation for student records, enrollment tracking, and future academic modules.

## Architecture

Layers:

- Types
- Repository
- Service
- Validation
- Routes
- HTTP Response Models

## Features

- Create student
- Read student
- Update student
- Delete student
- Admission number validation
- Duplicate admission number protection
- Student filtering support
- Standard error handling

## Validation Rules

- Admission number is required
- Admission number minimum length: 2 characters
- Admission number maximum length: 50 characters
- Full name is required
- Father name is required
- Name maximum length: 100 characters
- Admission number must be unique

## API Routes

- GET /api/v1/students
- GET /api/v1/students/:id
- POST /api/v1/students
- PUT /api/v1/students/:id
- DELETE /api/v1/students/:id
