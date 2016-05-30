( function ( window ) {

    var sections = ['goals', 'agenda', 'scratchpad'];
    sections.forEach( function ( section ) {
        var memo = new Memo( section );
        memo.loadData();
    });

})( window );
