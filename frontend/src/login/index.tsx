import './login.css';

const index = () => {
  return (
    <>
      <div className="container">
        <div className="heading">
          <h2 className="heading__text">Admin Login</h2>
        </div>
        <form className="admin-form">
          <div className="admin-form__form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="admin-form__form-group__input "
              required
              autoComplete="off"
            />
          </div>

          <div className="admin-form__form-group form-group--top-margin">
            <label htmlFor="password">Password</label>
            <div className="admin-form__form-group__input-wrapper">
              <input
                type="password"
                placeholder="Enter your password"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="admin-form__form-group form-group--top-margin">
            <button className="admin-form__form-group__submit-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default index;
