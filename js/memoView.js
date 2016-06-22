( function ( app ) {

    function initMemoView ( memo ) {

        var saveText = function () {
            this.saveData( 'content', this.ele.innerHTML );
        }

        // TODO create newElement helper function
        // create memo element
        var memoEle = document.createElement( 'section' );
        var contentID = memo.name + '-content';
        var memoContent = document.createElement( 'p' );
        memo.bindElement( 'ele', memoContent );
        memo.loadData();

        memoEle.setAttribute('id', memo.name + 'section');
        memoEle.classList.add( 'list' );
        memoEle.innerHTML = '<h1>' + memo.name + '</h1>';
        if ( memo.show ) { memoEle.classList.add( 'show' ); }

        memoContent.setAttribute( 'contenteditable', true );
        memoContent.setAttribute( 'id', contentID );
        memoContent.innerHTML = memo.content;
        memoContent.addEventListener( 'blur', saveText.bind( memo ) );


        memoEle.appendChild( memoContent );
        document.getElementById( 'container' ).appendChild( memoEle );

        // TODO
        // - add [edit]
        //   - show next to title on hover over title
        //   - show below title:
        //     - name
        //     - position (number)
        // - add [styles] section
        //   - header color
        //   - background color
        //   - memo color
        //   - memo:focus color
        //   - highlight color
        //   - tab title
        //   - horizontal vs vertical scroll*
        //   - memo default value ( rand0m yeaH )

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

                ['section', 'toggle'].forEach( function ( element ) {
                    var ele = document.getElementById( memo.name + element ),
                    parent = ele.parentElement;

                    parent.removeChild( ele );
                });
            }
        }

        // create memo switch
        var switchEle = document.createElement( 'div' );
        switchEle.setAttribute('id', memo.name + 'toggle' );
        switchEle.classList.add( 'switch' );
        if ( memo.show ) { switchEle.classList.add( 'show' ); }
        switchEle.innerHTML = '[' + memo.name + ']';
        document.getElementById( 'switches' ).insertBefore( switchEle, document.getElementById( 'action-switches' ) );

        memo.bindElement( 'toggleEle', switchEle );
        switchEle.parentElement.addEventListener( 'click', toggleMemo );
        switchEle.addEventListener( 'click', deleteMemo.bind( memo ) );

    }

    function addButton () {
        var addButton = document.getElementById( 'add-memo' );
        addButton.addEventListener( 'click', askForName );

        function askForName(e) {
            toggleButton( 'add' );

            // listen for enter key
            addButton.addEventListener( 'keydown', function ( event ) {
                if ( app.action !== 'adding' ) { return; }
                if ( event.keyCode === 13 || event.which === 13 ) {
                    var newMemo = new app.Memo( event.target.innerHTML );
                    app.memos.addMemo( newMemo );
                    app.initMemoView( newMemo );
                    toggleButton( 'remove' );
                }
            });
        }

        function toggleButton ( status ) {

            var checkStatus = status === 'add',
                edit = checkStatus,
                html = checkStatus ? 'enter a name' : '+',
                classFunc = checkStatus ? 'add' : 'remove',
                focus = checkStatus ? 'focus' : 'blur';
                action = checkStatus ? 'adding' : null;

            app.action = action
            addButton.innerHTML = html;
            addButton.parentElement.classList[classFunc]( 'show' );
            addButton.setAttribute( 'contenteditable', edit );
            addButton[focus]();

            document.getElementById( 'delete' ).style.display = checkStatus ? 'none' : 'initial';
        }
    }

    function deleteButton () {

        var deleteButton = document.getElementById( 'delete-memo' );
        deleteButton.addEventListener( 'click', toggleDelete );

        var deleting;
        function toggleDelete() {
            deleting = deleting ? false : true;
            app.action = deleting ? 'deleting' : null;

            var switches = document.getElementsByClassName('switch');
            var classFunc = deleting ? 'add' : 'remove';

            deleteButton.parentElement.classList[classFunc]('show');
            deleteButton.parentElement.classList[classFunc]('delete');

            document.getElementById( 'add' ).style.display = deleting ? 'none' : 'initial';

            for( var i = 0; i < switches.length; i++ ) {
                switches[i].classList[classFunc]('delete');
                switches[i].classList[classFunc]('show');
            }
        }
    }

    app.initMemoView = initMemoView;
    app.addButton = addButton;
    app.deleteButton = deleteButton;

})( window.app );
