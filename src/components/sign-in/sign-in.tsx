import * as React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {
  getAuthorizationFailed,
  getAuthorizationRequired, getCredentials} from '../../reducers/user/selectors';

import {SignIn, Credentials} from '../../types';

interface Props {
  handleSubmit: (submitData: SignIn) => void,
  bodyElement: HTMLBodyElement,
  credentials: Credentials,

  isAuthorizationFailed: boolean,
  isAuthorizationRequired: boolean
}

class SignInScreen extends React.PureComponent<Props, null> {
  private _formRef: React.RefObject<HTMLFormElement>;

  constructor(props) {
    super(props);

    this._formRef = React.createRef();
    this._submitForm = this._submitForm.bind(this);
  }

  static formMapper(target) {
    return {
      email: (value) => {
        target.email = value;
        return target;
      },
      password: (value) => {
        target.password = value;
        return target;
      }
    };
  }

  static _processForm(formData) {
    const entry = {
      'email': ``,
      'password': ``
    };

    const FormMapper = SignInScreen.formMapper(entry);
    for (const pair of formData.entries()) {

      const [property, value] = pair;
      if (FormMapper[property]) {

        value.trim();
        FormMapper[property](value);
      }
    }

    return entry;
  }

  _submitForm(e) {
    e.preventDefault();

    const form = this._formRef.current;
    const formData = new FormData(form);

    const newData = SignInScreen._processForm(formData);
    this.props.handleSubmit(newData);
  }

  render() {
    const {
      bodyElement,
      isAuthorizationFailed,
      isAuthorizationRequired} = this.props;


    if (!isAuthorizationRequired) {
      return <Redirect to="/"/>;
    }

    if (isAuthorizationFailed) {
      const formError = this._formRef.current.querySelector<HTMLSpanElement>(`.login__error`);
      formError.style.display = `block`;
    }

    bodyElement.className = `page page--gray page--login`;

    return (
    <>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
          </symbol>
        </svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" ref={this._formRef} method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required={false} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password"
                  required={false} />
              </div>
              <button className="login__submit form__submit button"
                type="submit" onClick={this._submitForm}>Sign in</button>

              <span className="login__error" style={{display: `none`, textAlign: `center`, paddingTop: `10px`}}>Неверный логин или пароль</span>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>);
  }
}

const mapStateToProps = (state, ownProps) => Object.assign(
    {}, ownProps, {
      credentials: getCredentials(state),
      isAuthorizationFailed: getAuthorizationFailed(state),
      isAuthorizationRequired: getAuthorizationRequired(state),
    });

export default connect(mapStateToProps)(SignInScreen);
