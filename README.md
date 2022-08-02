## Requirements

1. Docker
2. Composer

## Instructions

`cp .env.example .env`

Set `DB_USERNAME` and `DB_PASSWORD` in `.env` file

`composer install && cd web && npm install && cd ..`

`./vendor/bin/sail up -d`

`php artisan key:generate`

`php artisan migrate`

`php artisan passport:install`

`php artisan db:seed && php artisan db:seed --class=CurrencySeeder`

`change DB_HOST in env to mysql`

### Screenshots

Available in screenshots dir
