/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

/* Config file for VeeValidate */
/* Import and extend the rules you need to use. */
/* DOCUMENTATION: https://logaretm.github.io/vee-validate/guide/basics.html */

import { configure } from 'vee-validate'
// replace with 18n-with-config-space if you want to dinamically config the widget from locales

import { i18n } from './i18n.ts'

configure({
  // @ts-ignore
  defaultMessage: (_: any, values: any) => i18n.global.t(`validations.${values._rule_}`, values)
})
