class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?

    def logged_in
      flash[:alert] = "You must be logged in!"
      redirect_to root_path
    end
    
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :birthday])
  end

end
