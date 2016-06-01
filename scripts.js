( function ( window ) {

    // get initial data
    var memos = new Memos();
    var memosNames = memos.getMemos();
    memosNames.forEach( function ( name ) {
        var memo = new Memo( name );
        memo.loadData();
    });

    // add create button
    var addButton = document.getElementById( 'add-memo' );
    addButton.addEventListener( 'click', askForName );

    function askForName() {

        toggleButton( 'add' );

        // listen for enter key
        document.onkeypress = function ( event ) {
            // TODO be MAC friendly or whatever
            if ( event.keyCode === 13 || event.which === 13 ) {
                var newMemo = new Memo( event.target.innerHTML );
                memos.addMemo( newMemo );
                // newMemo.loadData();
                toggleButton( 'remove' );
            }
        }
    }

    function toggleButton ( status ) {

        var checkStatus = status === 'add',
            edit = checkStatus,
            html = checkStatus ? 'enter a name' : '+',
            classFunc = checkStatus ? 'add' : 'remove',
            focus = checkStatus ? 'focus' : 'blur';

        addButton.innerHTML = html;
        addButton.parentElement.classList[classFunc]( 'show' );
        addButton.setAttribute( 'contenteditable', edit );
        addButton[focus]();
    }

})( window );
