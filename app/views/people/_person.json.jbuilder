json.extract! person, :id, :name, :city_id, :state_id, :country_id, :created_at, :updated_at
json.url person_url(person, format: :json)
