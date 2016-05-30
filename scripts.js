( function ( window ) {
    
    var sections = ['goals', 'agenda'];

    document.getElementById('toggle-goals').classList.add('show');
    document.getElementById('toggle-agenda').classList.add('show');

    sections.forEach( function ( s ) {
        var list = new List ({ keypath: s, id: s[0] + '-content' });
        list.loadData();
        if ( s.show ) {
            document.getElementById('toggle-' + s).classList.add( 'show' );
        }
    });

})( window );
