module.exports = {
  plugins: ['react', 'react-hooks'],
  settings: {
    pragma: 'React',
    /**
     * 更推荐指定版本的写法，
     * 指定版本的写法更高效，
     * 节省了版本探测的阶段。
     */
    version: 'detect'
  },
  /**
   * @todo rules related to react-app
   */
  rules: []
};
