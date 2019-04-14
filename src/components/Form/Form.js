/** @format */

import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { Form as ReduxForm, reduxForm, getFormValues } from 'redux-form'
import { withSnackbar } from 'notistack'
import _ from 'lodash'

import { onSubmitFail as onSubmitFailCommon, onSubmitSuccess as onSubmitSuccessCommon } from 'api/actions'

const Form = ({
  children,
  mutation,
  variables,
  refetchQueries,
  update,
  ignoreResults,
  optimisticResponse,
  context,
  onCompleted,
  onError,
  handleSubmit,
  onSubmit,
  match,
  history,
  location,
  ...props
}) => (
  <React.Fragment>
    <Mutation
      mutation={mutation}
      variables={variables}
      refetchQueries={refetchQueries}
      onCompleted={onCompleted}
      context={context}
      onError={onError}
      update={update}
      ignoreResults={ignoreResults}
      optimisticResponse={optimisticResponse}
    >
      {mutation => (
        <ReduxForm onSubmit={handleSubmit(data => (onSubmit ? onSubmit({ mutation, data, ...props }) : mutation({ variables: { ...match.params, data } })))}>
          {children({ ...props })}
        </ReduxForm>
      )}
    </Mutation>
  </React.Fragment>
)

export default compose(
  withRouter,
  withSnackbar,
  connect(
    (
      state,
      {
        form,
        asyncBlurFields,
        asyncChangeFields,
        asyncValidate,
        destroyOnUnmount,
        enableReinitialize,
        forceUnregisterOnUnmount,
        getFormState,
        immutableProps,
        initialValues = {},
        keepDirtyOnReinitialize,
        updateUnregisteredFields,
        onChange,
        onSubmit,
        onSubmitFail = onSubmitFailCommon,
        onSubmitSuccess = onSubmitSuccessCommon,
        propNamespace,
        pure,
        shouldAsyncValidate,
        shouldError,
        shouldWarn,
        touchOnBlur,
        touchOnChange,
        persistentSubmitErrors,
        validate,
        warn
      }
    ) => ({
      form,
      asyncBlurFields,
      asyncChangeFields,
      asyncValidate,
      destroyOnUnmount,
      enableReinitialize,
      forceUnregisterOnUnmount,
      getFormState,
      immutableProps,
      keepDirtyOnReinitialize,
      updateUnregisteredFields,
      onChange,
      onSubmit,
      onSubmitFail,
      onSubmitSuccess,
      propNamespace,
      pure,
      shouldAsyncValidate,
      shouldError,
      shouldWarn,
      touchOnBlur,
      touchOnChange,
      persistentSubmitErrors,
      validate,
      warn,
      initialValues: _.omit(initialValues, 'id', 'owner', 'createdAt', 'updatedAt'),
      doc: getFormValues(form)(state) || initialValues
    })
  ),
  reduxForm()
)(Form)
