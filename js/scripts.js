(function( window ) {
    var app = window.app;

    var memos = new app.Memos();
    memos.all.forEach( function ( name ) {
        var memo = new app.Memo( name );
        app.initMemoView( memo );
    });

    if ( memos.all.length == 0 ) {
        var howTo = new app.Memo( 'how to use scratch tab' );
        var content = "<i>&gt;&gt;&gt; WHAT:</i><br><div>Scratch tab is a place for reminders (of how awesome you are...</div><div>or to take out the trash), throwaway writing, quickly typing</div><div>something down, and sharpening your cat claw wit.</div><div><br></div><div><br><i>&gt;&gt;&gt; HOW:&nbsp;</i></div><div>1. Create a new note: click the [+] in the lower right menu</div><div>&nbsp; &nbsp;Name it, hit enter, then start typing your note.</div><div>&nbsp; &nbsp;<b><u>IMPORTANT</u></b>: to save your note, click anywhere outside of it.</div><div>2. Show/hide a note: click it's title in the lower right menu.</div><div>3. Delete a note: click [x] then a note's name.</div><div>&nbsp; &nbsp;<b><u>IMPORTANT</u></b>: once you delete a note, there's no getting it back ):</div><div><br></div><div><br></div><div><i>&gt;&gt;&gt; MISC:</i></div><div>*. Use keyboard shortcuts to <b>bold, </b><u>underline,</u>&nbsp;or <i>italicize.</i></div><div><i>&nbsp; &nbsp;</i><b>CTRL + B, </b><u>CTRL + U,</u>&nbsp;<i>CTRL + I</i></div><div>*. Your notes are saved in your browser's local storage, meaning</div><div>&nbsp; &nbsp;no one else can see them, and! they're all available offline.</div><div>*. Want to contribute or just see the code?</div><div>&nbsp; &nbsp;&gt;&gt;&gt; github.com/sajoy/scratch-tab</div><div><br></div><div><br>✌️ and 😍, <br>SJ</div>"

        howTo.saveData( 'content', content );
        memos.addMemo( howTo );
        app.initMemoView( howTo );
    }

    app.memos = memos;
    app.bindToggles();

} ( window ));
