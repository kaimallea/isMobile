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
    },

    uglify: {
      my_target: {
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
