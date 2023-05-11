import React from "react";

function Login(props) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    props.handleLogin(email, password);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-form__title">Вход</h3>
      <input
        type="email"
        className="login-form__input"
        name="email"
        id="email"
        required
        minLength="3"
        maxLength="40"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        type="password"
        className="login-form__input"
        name="password"
        id="password"
        required
        minLength="6"
        maxLength="40"
        placeholder="Пароль"
        value={formValue.password}
        onChange={handleChange}
      />
      <button className="login-form__button">Войти</button>
    </form>
  );
}
export default Login;