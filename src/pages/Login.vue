<script setup></script>

<template>
  <div className="contact-wrapper">
    <header className="login-cta">
      <h2>Account Login</h2>
    </header>

    <form onSubmit="{handleSubmit(submit)}">
      <div className="form-row">
        <input type="text" />
        <span>Email</span>
      </div>
      <div className="form-row">
        <input type="password" />
        <span>Password</span>
      </div>
      <div className="form-row"></div>
      <div className="form-row">
        <button class="registration" type="submit"></button>
      </div>

      <div class="titles">
        <div class="registration-button-title">
          Not a member?
          <div className="registration-button">Signup now</div>
        </div>
        <div class="forget-password">Forget password?</div>
      </div>
    </form>

    <div className="socials-wrapper">
      <header>
        <h2>Login with your Social Account</h2>
      </header>
      <ul>
        <li>
          <Link to="/authByVk" className="facebook"> <VkontacteIco /> Vkontakte </Link>
        </li>
        <li>
          <a href="#" className="twitter"> <YandexIco /> Yandex </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Rajdhani:500,700&display=swap');

$font: 'Rajdhani';
$colorPurple: #615dfa;
$colorDark: #3e3f5e;

*,
*:before,
*:after {
  box-sizing: border-box;
}

.contact-wrapper {
  background: #fff;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.15);
  border-radius: 0.75em;
  padding: 2em;
  width: 25em;

  font-family: $font, sans-serif;

  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  @media (max-width: 700px) {
    width: 22em;
  }
}

.login-cta {
  & > h2 {
    color: $colorDark;
    font-size: 1.75rem;
    text-align: center;
  }
}

.socials-wrapper {
  & > header {
    & > h2 {
      background: #fff;
      color: $colorDark;
      font-size: 1rem;
      position: relative;
      text-align: center;
      z-index: 10;

      &:after,
      &:before {
        background: lighten($colorDark, 55);
        content: '';
        display: block;
        height: 0.1em;
        position: absolute;
        top: 50%;
        transform: translatey(-50%);
        width: 17.5%;
      }

      &:after {
        right: 0;
      }

      &:before {
        left: 0;
      }
    }
  }

  & > ul {
    display: flex;
    align-items: center;
    list-style: none;
    justify-content: center;
    padding: 0;

    & > li {
      margin: 0.5em;

      .custom-vk-button {
        all: unset;
      }

      & > a {
        width: 150px;
        align-items: center;
        border-radius: 0.5em;
        color: #fff;
        display: flex;
        justify-content: center;
        text-align: center;
        text-decoration: none;
        transition: all 300ms ease;

        &.facebook {
          background-color: #3763d2;
          padding: 5px 0;
          svg {
            margin-right: 5px;
            width: 30px;
            height: 30px;
          }
        }
        &.twitter {
          background-color: black;
          padding: 7.5px 0;
          svg {
            margin-right: 5px;
            width: 25px;
            height: 25px;
          }
        }

        &:hover {
          transform: translatey(-0.25em);
        }
      }
    }
  }
}

h3 {
  text-align: center;
}

form {
  margin: 2em 0;
  & > .form-row {
    display: flex;
    margin: 0.75em 0;
    position: relative;

    & > span {
      background: #fff;
      color: #adafca;
      display: inline-block;
      font-weight: 400;
      left: 1em;
      padding: 0 0.5em;
      position: absolute;
      pointer-events: none;
      transform: translatey(-50%);
      top: 50%;
      transition: all 300ms ease;
      user-select: none;
    }

    & > input,
    & > button {
      border-radius: 0.5em;
      font-family: inherit;
      padding: 1em 0.5em;
      width: 100%;
    }

    & > input {
      font-weight: bold;
      transition: 100ms ease all;
      width: 100%;

      &[type='text'],
      &[type='password'] {
        border: 0.075em solid #ddd;
      }

      &:valid {
        & + span {
          top: 0;
          font-size: 0.9rem;
        }
      }

      &:invalid {
        & + span {
          top: 50%;
        }
      }

      &:focus {
        & + span {
          top: 0;
        }
      }

      &:required {
        box-shadow: none;
      }

      &:focus {
        border-color: var(--main-bg);
        outline: none;
        &:invalid {
          box-shadow: none;
          top: 50%;
        }
        &:valid {
          top: 0;
        }
      }
    }

    & > button {
      background-color: var(--button-bg);
      border: 0.1em solid var(--button-bg);
      color: #fff;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      transition: all 300ms ease;

      &:focus {
        border: 0.1em solid var(--main-bg);
        outline: none;
      }

      &:hover {
        background-color: var(--main-bg);
      }

      &:disabled {
        background-color: var(--button-disabled);
      }
    }
  }

  .errorBackground {
    font-size: 14px;
    font-weight: bold;
    color: rgb(207, 52, 52);
  }

  .registration {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      width: 20px !important;
      height: 20px !important;
    }
  }

  .titles {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .registration-button-title {
      display: flex;

      .registration-button {
        cursor: pointer;
        margin-left: 5px;
        color: var(--main-bg);
        border-bottom: 1px solid var(--main-bg);

        &:hover {
          color: var(--button-bg);
          border-bottom: 1px solid var(--button-bg);
        }
      }
    }

    .forget-password {
      cursor: pointer;
      color: var(--main-bg);
      border-bottom: 1px solid var(--main-bg);

      &:hover {
        color: var(--button-bg);
        border-bottom: 1px solid var(--button-bg);
      }
    }
  }
}
</style>
