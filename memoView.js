( function ( module ) {

    function initMemoView ( memo ) {
        console.log( memo );

        // TODO - create and render elements
        // do I need these specific IDS? or just bind event listeners to the eles when creating them!

        // create section
        // add id = keypath
        // class = 'list'
        // h1 keypath
        // p tag with id keypath-content
        // set p tag contenteditable
        // append to #container

        // <section id='goals' class='list'>
        //     <h1>#goals</h1>
        //     <p id='g-content' contenteditable></p>
        // </section>

        var memoEle = document.createElement('section');
        memoEle.innerHTML = '<h1>' + memo.keypath + '</h1>' +
        '<p id="' + memo.keypath + '-content" contenteditable></p>';
        memoEle.setAttribute('id', memo.keypath + 'section');
        document.getElementById('container').appendChild(memoEle);

        var switchEle = document.createElement('div');
        switchEle.setAttribute('id', memo.keypath + 'toggle');
        switchEle.innerHTML = '[' + memo.keypath + ']';
        switchEle.addEventListener( 'click', memo.toggle.bind( memo ) );

        document.getElementById('switches').appendChild(switchEle);

    }

    function addButton ( memos ) {
        var addButton = document.getElementById( 'add-memo' );
        addButton.addEventListener( 'click', askForName );

        function askForName() {
            // TODO create memo with placeholder text
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
    }

    module.initMemoView = initMemoView;
    module.addButton = addButton;

})( window );
