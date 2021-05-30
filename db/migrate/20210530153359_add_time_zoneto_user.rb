class AddTimeZonetoUser < ActiveRecord::Migration[5.2]
  def change
    add_column :people, :time_zone, :text, default: "UTC"
  end
end
