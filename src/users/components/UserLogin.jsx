import React, { Fragment } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import AppLogger from '../../commons/logger/AppLogger'
import AppCoreModule from '../../core/index'
import withUserLoginStyle from '../styles/withUserLoginStyle'

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required Email'),
  password: Yup.string()
    .required('Required Password'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Password and confirmation must been the same')
    .required('Required Password Confirmation'),
})

const UserLogin = (props) => {
  // log users props
  AppLogger.info('UserLogin props : ', props)
  const {
    loading,
    error,
    onUserLoginClick,
    className,
  } = props
  AppLogger.info('UserLogin error : ', error)
  AppLogger.info('UserLogin loading : ', loading)
  AppLogger.info('UserLogin onUserLoginClick : ', onUserLoginClick)
  AppLogger.info('UserLogin className : ', className)

  // on user login click
  const onUserLoginClicked = (item) => {
    AppLogger.info('UserLogin item : ', item)
    onUserLoginClick(item)
  }

  // user list loading status
  if (loading) {
    return <AppCoreModule.LoadingPage />
  }

  // user list error status
  if (error) {
    return <AppCoreModule.ErrorPage {...error} />
  }

  // render form
  return (
    <Fragment>
      <div className={className}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={UserSchema}
          onSubmit={(values) => {
            // log submit status
            onUserLoginClicked(values)
          }}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) =>
            (
              <form
                className="user-login-form"
                onSubmit={handleSubmit}
              >
                <input
                  className="user-input-field"
                  type="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors && errors.email &&
                  <div className="user-submit-error-block">{errors.email}</div>
                }
                <input
                  className="user-input-field"
                  type="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors && errors.password &&
                  <div className="user-submit-error-block">{errors.password}</div>
                }
                <input
                  className="user-input-field"
                  type="Password"
                  name="password_confirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                />
                {touched.password_confirmation && errors && errors.password_confirmation &&
                  <div className="user-submit-error-block">{errors.password_confirmation}</div>
                }
                <div className="user-submit-block">
                  <button
                    className="user-submit-button"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
        />
      </div>
    </Fragment>
  )
}

// prop type validation
UserLogin.propTypes = {
  className: PropTypes.string,
  onUserLoginClick: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

// default prop
UserLogin.defaultProps = {
  className: null,
  onUserLoginClick: null,
  error: null,
  loading: false,
}

export default withUserLoginStyle(UserLogin)
