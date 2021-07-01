/*
 * @Description:
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-06-28 16:55:13
 * @LastEditors: 王敏
 * @LastEditTime: 2021-06-30 17:08:32
 */
module.exports = {
  root: true,

  env: {
    node: true
  },

  globals: {
    AMap: null,
    AMapUI: null
  },

  extends: ['eslint:recommended', 'standard', 'plugin:vue/recommended'],

  parserOptions: {
    parser: 'babel-eslint'
  }
}
