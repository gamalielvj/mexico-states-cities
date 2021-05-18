class Country < ApplicationRecord
   has_many :states, dependent: :destroy
   has_many :cities, through: :state
end
