
---

# Laravel Project

[![StartEase](https://img.shields.io/badge/Generated%20by-StartEase-blue)](https://github.com/JC-Coder/startease)

## Overview

Welcome to your project generated using StartEase! This guide will walk you through the basic configuration steps to get your backend project up and running.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Make sure you have the MongoDB PHP driver installed. You can find installation instructions at https://php.net/manual/en/mongodb.installation.php


## Configuration

### Environment Variables

Your project relies on environment variables for configuration. To set up these variables:

1. Go to your `.env` file in the project root directory.

#### For MongoDB ORM

2. Add the following environment variables to the `.env` file:

   ```plaintext
   DB_DSN = 
   ```
   Note: DB_DSN expects your project MongoDB connection string. You can get that from your MongoDB Atlas if you are running your database on the cloud, or the MongoDB cli or gui if you are using the local MongoDB.

Replace `APP_NAME`, etc., with your actual project and database information.

### Start the Project

Once you've configured your environment variables, you can start your project:

```bash
cd APP_NAME
php artisan serve
```

Your backend server should now be running at http://localhost:<specified-port>.
