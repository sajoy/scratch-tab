( function ( app ) {

    function initMemoView ( memo ) {

        var saveText = function () {
            this.saveData( 'content', this.ele.innerHTML );
        }

        // TODO create newElement helper function


        // create memo element
        var memoEle = document.createElement( 'section' );
        var contentID = memo.eleName + '-content';
        var memoContentEle = document.createElement( 'p' );
        memo.bindElement( 'ele', memoContentEle );
        memo.loadData();

        memoEle.setAttribute('id', memo.eleName + '-section');
        memoEle.classList.add( 'list' );
        memoEle.innerHTML = '<h1>' + memo.name + '</h1>';
        if ( memo.show ) { memoEle.classList.add( 'show' ); }

        memoContentEle.setAttribute( 'contenteditable', true );
        memoContentEle.setAttribute( 'id', contentID );
        memoContentEle.innerHTML = memo.content;
        memoContentEle.addEventListener( 'blur', saveText.bind( memo ) );

        memoEle.appendChild( memoContentEle );
        document.getElementById( 'container' ).appendChild( memoEle );


        // event functions
        var toggleMemo = function ( e ) {
            if ( '[' + memo.name + ']' === e.target.innerHTML ) {
                var newStatus = !memo.show,
                classFunc = newStatus ? 'add' : 'remove';
                memo.saveData( 'show', newStatus );
                memo.ele.parentElement.classList[classFunc]( 'show' );
                memo.toggleEle.classList[classFunc]( 'show' );
            }
        }

        var deleteMemo = function ( e ) {
            if ( app.action === 'deleting' ) {
                e.stopPropagation();
                app.memos.deleteMemo( this );

                ['-section', '-toggle'].forEach( function ( element ) {
                    var ele = document.getElementById( memo.eleName + element ),
                    parent = ele.parentElement;

                    parent.removeChild( ele );
                });
            }
        }

        // create memo switch
        var switchEle = document.createElement( 'div' );
        switchEle.setAttribute('id', memo.eleName + '-toggle' );
        switchEle.classList.add( 'switch' );
        if ( memo.show ) { switchEle.classList.add( 'show' ); }
        switchEle.innerHTML = '[' + memo.name + ']';
        document.getElementById( 'switches' ).insertBefore( switchEle, document.getElementById( 'action-switches' ) );

        memo.bindElement( 'toggleEle', switchEle );
        switchEle.parentElement.addEventListener( 'click', toggleMemo );
        switchEle.addEventListener( 'click', deleteMemo.bind( memo ) );

    }


// add, delete, back buttons

    var addButtonEle = document.getElementById( 'add-memo' );
    var deleteButtonEle = document.getElementById( 'delete-memo' );
    var backButton = document.getElementById( 'back' );

    addButtonEle.addEventListener( 'click', askForName );
    deleteButtonEle.addEventListener( 'click', toggleDelete );
    backButton.addEventListener( 'click', goBack );

    function askForName(e) {
        app.action = 'adding';
        toggleAdd();

        // listen for enter key
        addButtonEle.addEventListener( 'keydown', function ( event ) {
            if ( app.action !== 'adding' ) { return; }
            if ( event.keyCode === 13 || event.which === 13 ) {
                var newMemo = new app.Memo( event.target.innerHTML );
                app.memos.addMemo( newMemo );
                app.initMemoView( newMemo );
                // newMemo.focus();
                goBack();
            }
        });
    }

    function toggleAdd () {
        var adding = app.action == 'adding',
            classFunc = adding ? 'add' : 'remove';

        addButtonEle.innerHTML = adding ? 'new name' : '+';
        addButtonEle.parentElement.classList[classFunc]( 'show' );
        addButtonEle.setAttribute( 'contenteditable', adding );
        addButtonEle.focus();

        toggle( 'delete', adding );
        toggle( 'back', !adding );
    }

    function toggleDelete() {
        var deleting = app.action !== 'back';
        if ( deleting ) { app.action = 'deleting'; }

        var switches = document.getElementsByClassName('switch');
        var classFunc = deleting ? 'add' : 'remove';

        deleteButtonEle.innerHTML = deleting ? 'click a name to delete' : 'x';
        deleteButtonEle.parentElement.classList[classFunc]('show');
        deleteButtonEle.parentElement.classList[classFunc]('delete');

        toggle( 'add', deleting );
        toggle( 'back', !deleting );

        for( var i = 0; i < switches.length; i++ ) {
            switches[i].classList[classFunc]('delete');
        }
    }

    function goBack() {
        switch (app.action) {
            case 'adding':
                app.action = 'back';
                toggleAdd();
                break;
            case 'deleting':
                app.action = 'back';
                toggleDelete();
                break;
            default:
                console.log('lol, what?')
                break;
        }
        app.action = null;
    }

    function toggle ( button, condition ) {
        document.getElementById( button ).style.display = condition ? 'none' : 'initial';
    }

    app.initMemoView = initMemoView;

})( window.app );
