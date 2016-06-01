( function ( module ) {

    class App {
        constructor () {
            this.action = null;
            this.styles = {};
        }
    }

    var app = new App();
    module.app = app;

})( window );
