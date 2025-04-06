#!/bin/bash

# HackSnub Dependencies Installation Script
echo "Installing HackSnub dependencies..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is required but not installed. Please install Node.js and npm first."
    exit 1
fi

# Install all dependencies from package.json
npm install

# Check if PostgreSQL is installed
if command -v psql &> /dev/null; then
    echo "PostgreSQL is installed."
else
    echo "Warning: PostgreSQL does not appear to be installed. You'll need PostgreSQL for the database."
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating sample .env file..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL=postgres://user:password@localhost:5432/hacksnub
PGHOST=localhost
PGPORT=5432
PGDATABASE=hacksnub
PGUSER=your_user
PGPASSWORD=your_password

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_key
EOF
    echo ".env file created. Please update with your actual credentials."
fi

# Push database schema
echo "Running database schema migration..."
npm run db:push

echo "Dependencies installation complete!"
echo "You can now start the development server with: npm run dev"