module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jasmine: {
      options: {
        specs:   'tests/spec/*.js'
      },
      isMobile: {
        src: ['isMobile.js']
      },
      isMobileMin: {
        src: ['isMobile.min.js']
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      main: {
        files: {
          'isMobile.min.js': ['isMobile.js']
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'isMobile.js', 'tests/spec/**/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify', 'jasmine']);

};
