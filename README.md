# README
# Mexico-states-cities

Simple web application (still working on it, mainly backend, I just want functionality).
I get all the data (JSON) of Mexico, States and Cities, and imported to a PostgreSQL database. Added a Person model just to interact with a form with filters select options by Country - States - Cities. (In this case is only Mexico, but you can add more data if you want, check it out ./db/seeds.rb).

What it does
- CRUD, Basic or default forms. (Countries - States - Cities)
- CRUD, advance form. Dynamic dependent drop down list with Jquery (People)
- Show page of a Country and it list the states its owns.
- Show page of a State and it list the cities its owns.


What it doesn't do
- edit form, needs to fix the Dropdowns.
- [Conditional GET](https://apidock.com/rails/ActionController/ConditionalGet/fresh_when).
- CACHE or something (index pages, display lists takes too much time).
- Timestamps.

[Source JSON](https://dr5hn.github.io/countries-states-cities-database/), thanks to [*drh5*](https://github.com/dr5hn).

------------


Things you may want to cover:

#### Ruby on Rails version
- Ruby 2.6.3
- Rails 5.2.5

#### System dependencies
- PostgreSQL
- jquery-rails
- semantic-ui-sass

#### Configuration

#### Database creation and initialization
    $ rails db:create
    $ rails db:schema:load
    $ rails db:seed`

...
