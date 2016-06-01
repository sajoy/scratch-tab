( function ( module ) {

    function initMemoView ( memo ) {

        // create memo element
        var memoEle = document.createElement('section');
        var contentID = memo.keypath + '-content';
        memoEle.setAttribute('id', memo.keypath + 'section');
        memoEle.innerHTML = '<h1>' + memo.keypath + '</h1>' + '<p id="' + contentID + '" contenteditable></p>';

        var memoContent = document.getElementById(contentID);
        memoContent.addEventListener( 'blur', memo.saveText.bind( memo ) );
        memo.bindElement( memoContent );
        memo.loadData();
        document.getElementById('container').appendChild(memoEle);


        // create memo switch
        var switchEle = document.createElement('div');
        switchEle.setAttribute('id', memo.keypath + 'toggle');
        switchEle.classList.add('switch');
        switchEle.innerHTML = '[' + memo.keypath + ']';
        switchEle.addEventListener( 'click', memo.toggle.bind( memo ) );
        document.getElementById('switches').insertBefore( switchEle, document.getElementById('add') );

    }

    function addButton ( memos ) {
        var addButton = document.getElementById( 'add-memo' );
        addButton.addEventListener( 'click', askForName );

        function askForName() {
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

            // TODO how to attach a DIFFERENT event listerner on the delete switches D:
            // add to #switches instead then stopPropogation before it hits the opening click, figure out what was the target id to find the memo
        }
    }


    module.initMemoView = initMemoView;
    module.addButton = addButton;
    module.deleteButton = deleteButton;

})( window );
