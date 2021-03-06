class PeopleController < ApplicationController
  before_action :set_person, only: %i[ show edit update destroy ]
  before_action :set_variables_for_location, only: [:new, :edit, :create, :update]
  before_action :set_variables_for_time_zone, only: [:new, :edit, :create, :update]



  # GET /people or /people.json
  def index
    @people = Person.all
  end

  # GET /people/1 or /people/1.json
  def show
  end

  # GET /people/new
  def new
    @person = Person.new
  end

  # GET /people/1/edit
  def edit
  end

  # POST /people or /people.json
  def create
    @person = Person.new(person_params)

    respond_to do |format|
      if @person.save
        format.html { redirect_to @person, notice: "Person was successfully created." }
        format.json { render :show, status: :created, location: @person }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /people/1 or /people/1.json
  def update
    respond_to do |format|
      if @person.update(person_params)
        format.html { redirect_to @person, notice: "Person was successfully updated." }
        format.json { render :show, status: :ok, location: @person }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /people/1 or /people/1.json
  def destroy
    @person.destroy
    respond_to do |format|
      format.html { redirect_to people_url, notice: "Person was successfully destroyed." }
      format.json { head :no_content }
    end
  end






  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def person_params
      params.require(:person).permit(:name, :city_id, :state_id, :country_id, :time_zone)
    end

    # Set variables for the _form
    def set_variables_for_location
      #@countries = Country.all.map{|country|[country.name, country.id]}
      #@states = State.all.map{|state|[state.name, state.id]}
      #@cities = City.all.map{|city|[city.name, city.id]}
      @countries = Country.all
      #@states = State.all
      #@cities = City.all
      # Fill empty for the first load new person, edit person fails (empties fields). maybe if params present
      @states = []
      @cities = []
    end

    def set_variables_for_time_zone
      #@zones_mx = ActiveSupport::TimeZone.country_zones('MX')
      #@zones_mx = ActiveSupport::TimeZone.country_zones(Country.first.country_code)

      @zones_by_country = ActiveSupport::TimeZone.all
      
    end


end
