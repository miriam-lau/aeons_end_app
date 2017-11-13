class MagesController < ApplicationController

  # API endpoint that returns the mages as a JSON object. It is an array of
  # objects of type Mage.
  def index
    @mages = Mage.all
    render :json => @mages
  end
end
