module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      isMobile: {
        src: ['isMobile.js'],
        options: {
          specs:   'tests/spec/*.js',
          version: '1.3.1'
        }
      },
      isMobileMin: {
        src: ['isMobile.min.js'],
        options: {
          specs:   'tests/spec/*.js',
          version: '1.3.1'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('test', 'jasmine');

};