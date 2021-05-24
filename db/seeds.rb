# Import JSON
#require 'json'

# ///-----------------------  Works and tested ------------------
#Country.delete_all
#State.delete_all
#City.delete_all

data_hash = JSON.parse(File.read('public/countries+states+citiesMX.json'))
data_hash.each do |dh|
      if dh["name"] == "Mexico"
        Country.create!(name: dh["name"], country_code: dh["iso2"] )

        @mxstates = dh['states']
        @mxstates.each do |state|
          State.create!(name: state["name"], state_code: state["state_code"], country_id: Country.last.id  )

          @mxcities = state['cities']
          @mxcities.each do |city|
            City.create!(name: city["name"], state_id: State.last.id  )
          end
        end
     end
end
Rails.logger.info "//************ Results...************"
Rails.logger.debug "//------------Country: #{Country.last.name}"
Rails.logger.debug "//------------States: #{State.count}"
Rails.logger.debug "//------------Cities: #{City.count}"
#  ------------------------------------------------------------------
