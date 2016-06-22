(function( window ) {
    var app = window.app;

    var memos = new app.Memos();
    memos.all.forEach( function ( name ) {
        var memo = new app.Memo( name );
        app.initMemoView( memo );
    });

    app.memos = memos;
    app.addButton();
    app.deleteButton();

} ( window ));
