( function ( window ) {

    // TODO store section names in localStorage & fetch them from there
    var sections = ['goals', 'agenda', 'scratchpad'];


    sections.forEach( function ( section ) {
        var memo = new Memo( section );
        memo.loadData();
    });

    var addButton = document.getElementById('add-memo');
    addButton.addEventListener( 'click', askForName );

    function askForName() {
        addButton.innerHTML = 'enter a name';
        addButton.parentElement.classList.add( 'show' );
        addButton.setAttribute( 'contenteditable', true );
        addButton.focus();

        document.onkeypress = function ( event ) {
            if ( event.keyCode === 13 || event.which === 13 ) {
                var name = event.target.innerHTML;
                var newMemo = new Memo( name );
                newMemo.loadData();
            }
        }
    }

})( window );
