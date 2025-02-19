# Use the smallest possible PHP + Apache image
FROM php:8.2-apache

# Install essential dependencies for PostgreSQL and MySQL extensions
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install mysqli pdo pdo_mysql && \
    docker-php-ext-install pgsql pdo_pgsql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set ServerName to suppress the warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Set working directory
WORKDIR /var/www/html

# Copy only necessary application files
COPY . .

# Ensure Laravel serves from the public/ directory
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
