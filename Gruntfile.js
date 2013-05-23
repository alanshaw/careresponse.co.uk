module.exports = function(grunt) {
  
  grunt.initConfig({
    
    // Copy static files
    copy: {
      dist: {
        files: [{dest: 'dist/', src: '**', expand: true, cwd: 'src/static/'}]
      }
    },
    
    // Compile LESS
    less: {
      compile: {
        files: {
          'dist/css/ie.css': ['dist/css/normalize.css', 'dist/css/main.css', 'src/css/ie.less'],
          'dist/css/main.css': ['dist/css/normalize.css', 'dist/css/main.css', 'src/css/main.less']
        }
      }
    },
    
    // Minify the site script
    uglify: {
      compress: {
        src: 'dist/js/main.js',
        dest: 'dist/js/main.js'
      }
    },
    
    // Minify the site CSS
    cssmin: {
      compress: {
        files: {
          'dist/css/main.css': 'dist/css/main.css',
          'dist/css/ie.css': 'dist/css/ie.css'
        }
      }
    },
    
    // Create the html files from page layouts and partial html fragments
    assemble: {
      options: {
        assets: '/',
        layout: 'src/layouts/h5bp.hbs',
        partials: 'src/partials/*.hbs',
        data: 'src/data/*.json'
      },
      pages: {
        files:[{expand: true, cwd: 'src/pages/', src: '**/*.hbs', dest: 'dist', ext: '.html'}]
      }
    },
    
    // Watch JS, LESS & HTML files for changes, copy & compile but not minify for easy debug during dev
    watch: {
      project: {
        files: 'src/**',
        tasks: ['copy', 'less', 'assemble']
      }
    },
    
    clean: {
      dist: 'dist/*'
    }
  });
  
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('default', ['copy', 'less', 'uglify', 'cssmin', 'assemble']);
};


