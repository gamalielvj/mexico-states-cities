class AddReferences < ActiveRecord::Migration[5.2]
  def change
    # Works but is already on schema
    #add_reference  :cities, :states , column: :state_id, foreign_key: true
    #add_reference  :states, :countries , column: :country_id, foreign_key: true

    # not necesary after add_reference
    #add_foreign_key :cities, :states, column: :state_id, foreign_key: true
    #add_foreign_key :states, :countries, column: :country_id, foreign_key: true
  end
end
