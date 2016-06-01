( function ( module ) {

    // get initial data
    var memos = new Memos(),
        memosNames = memos.getMemos();

    memosNames.forEach( function ( name ) {
        var memo = new Memo( name );
        module.initMemoView( memo );
    });

    // add create button
    // meh passing through the memos?
    module.addButton( memos );
    module.deleteButton( memos );

})( window );
