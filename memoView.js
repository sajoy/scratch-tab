( function ( module ) {

    function initMemoView ( memo ) {

        var saveText = function () {
            this.saveData( 'content', this.ele.innerHTML );
        }

        // TODO create newElement helper function
        // create memo element
        var memoEle = document.createElement( 'section' );
        var contentID = memo.name + '-content';
        var memoContent = document.createElement( 'p' );
        memoEle.setAttribute('id', memo.name + 'section');
        memoEle.classList.add( 'list' );
        memoEle.classList.add( 'show' );
        memoEle.innerHTML = '<h1>' + memo.name + '</h1>';

        memoContent.setAttribute( 'contenteditable', true );
        memoContent.setAttribute( 'id', contentID );
        memoContent.innerHTML = memo.content;
        memoContent.addEventListener( 'blur', saveText.bind( memo ) );
        memo.bindElement( memoContent );

        memoEle.appendChild( memoContent );
        document.getElementById( 'container' ).appendChild( memoEle );


        // create memo switch
        var toggleMemo = function ( e ) {
            var newStatus = !this.show,
                classFunc = newStatus ? 'add' : 'remove';
            this.saveData( 'show', newStatus );
            this.ele.parentElement.classList[classFunc]( 'show' );
        }

        var switchEle = document.createElement( 'div' );
        switchEle.setAttribute('id', memo.name + 'toggle' );
        switchEle.classList.add( 'switch' );
        switchEle.innerHTML = '[' + memo.name + ']';
        switchEle.addEventListener( 'click', toggleMemo.bind( memo ) );
        document.getElementById( 'switches' ).insertBefore( switchEle, document.getElementById( 'add' ) );

    }

    function addButton ( memos ) {
        var addButton = document.getElementById( 'add-memo' );
        addButton.addEventListener( 'click', askForName );

        function askForName(e) {
            // e.stopPropogation;
            toggleButton( 'add' );

            // listen for enter key
            // TODO LOL unbind? remove? unsubscribe make it stop somehow pls. (fix bug)
            document.onkeypress = function ( event ) {
                // TODO be MAC friendly or whatever
                if ( event.keyCode === 13 || event.which === 13 ) {
                    var newMemo = new Memo( event.target.innerHTML );
                    memos.addMemo( newMemo );
                    module.initMemoView( newMemo );
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
    }

    function deleteButton ( memos ) {

        var deleteButton = document.getElementById( 'delete-memo' );

        deleteButton.addEventListener( 'click', toggleDelete );

        var deleting;
        function toggleDelete() {
            deleting = deleting ? false : true;
            var switches = document.getElementsByClassName('switch');
            var classFunc = deleting ? 'add' : 'remove';

            deleteButton.parentElement.classList[classFunc]('show');
            deleteButton.parentElement.classList[classFunc]('delete');

            document.getElementById( 'add' ).style.display = deleting ? 'none' : 'initial';

            for( var i = 0; i < switches.length; i++ ) {
                switches[i].classList[classFunc]('delete');
                switches[i].classList[classFunc]('show');
            }

            var deleteEvent = function (e) {
                e.stopPropogation;
                console.log( e.target.innerHTML );
            }

            if ( deleting ) {
                document.getElementById('switches').addEventListener('click', deleteEvent );
            }
            else {
                document.getElementById('switches').removeEventListener('click', deleteEvent );
            }

            // TODO how to attach a DIFFERENT event listerner on the delete switches D:
            // add to #switches instead then stopPropogation before it hits the opening click, figure out what was the target id to find the memo
        }
    }


    module.initMemoView = initMemoView;
    module.addButton = addButton;
    module.deleteButton = deleteButton;

})( window );
