class StatesController < ApplicationController
  before_action :set_state, only: %i[ show edit update destroy ]

  # GET /states or /states.json
  def index
    #@states = State.all

    # People _form Dropdown
    if params[:country].present?
        @states = Country.find(params[:country]).states
        @country_code = Country.find(params[:country]).country_code
        @zones_by_country = ActiveSupport::TimeZone.country_zones(@country_code)
    else
        @states = State.all # Like "normal" index
    end
    if request.xhr?
        respond_to do |format|
            format.json {
                render json: {
                              states: @states,
                              zones: @zones_by_country
                              }
            }
        end
    end
    #--------------------------

  end

  # GET /states/1 or /states/1.json
  def show
  end

  # GET /states/new
  def new
    @state = State.new
  end

  # GET /states/1/edit
  def edit
  end

  # POST /states or /states.json
  def create
    @state = State.new(state_params)

    respond_to do |format|
      if @state.save
        format.html { redirect_to @state, notice: "State was successfully created." }
        format.json { render :show, status: :created, location: @state }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @state.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /states/1 or /states/1.json
  def update
    respond_to do |format|
      if @state.update(state_params)
        format.html { redirect_to @state, notice: "State was successfully updated." }
        format.json { render :show, status: :ok, location: @state }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @state.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /states/1 or /states/1.json
  def destroy
    @state.destroy
    respond_to do |format|
      format.html { redirect_to states_url, notice: "State was successfully destroyed." }
      format.json { head :no_content }
    end
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_state
      @state = State.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def state_params
      params.require(:state).permit(:name, :state_code, :country_id)
    end
end
