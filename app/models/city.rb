class City < ApplicationRecord
  # works
  belongs_to :state
  # works but test if necessary
  has_one :country, through: :state
end
