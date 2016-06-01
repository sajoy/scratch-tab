( function ( window ) {
    class Memos {
        constructor () {
            this.all = [];
        }

        addMemo ( memo ) {
            this.all.push( memo.keypath );
            localStorage.setItem( 'memos', JSON.stringify( this.all ) );
        }

        getMemos () {
            return localStorage['memos'] ? JSON.parse( localStorage['memos'] ) : this.all;
        }
    }

    class Memo {
        constructor ( keypath ) {
            this.keypath = keypath;


            // TODO create html elements
            // is this the best place?

            // section
            // <section id='goals' class='list'>
            //     <h1>#goals</h1>
            //     <p id='g-content' contenteditable></p>
            // </section>

            // toggle
            // <div id='toggle-styes'>[styles]</div>
            //
            //
            // this.toggleId = 'toggle-' + this.keypath;
            // this.contentId = this.keypath[0] + '-content';
            // this.showId = this.keypath + 'show';
            //
            // this.ele = document.getElementById( this.contentId );
            // this.switch = document.getElementById( this.toggleId );
            //
            // this.show = localStorage[this.showId] ? JSON.parse(localStorage[this.showId]) : false;
            //
            // this.saveText = this._saveText;
            // this.ele.addEventListener( 'blur', this.saveText.bind( this ) );
            //
            // this.toggle = this._toggle;
            // this.switch.addEventListener( 'click', this.toggle.bind( this) );
        }

        _show () {
            this.ele.parentElement.classList.add( 'show' );
            this.switch.classList.add( 'show' );
        }

        _toggle () {
            if ( this.show ) {
                this.ele.parentElement.classList.remove( 'show' );
                this.switch.classList.remove( 'show' );
                this.show = false;
            }
            else {
                this._show();
                this.show = true;
            }
            this._saveData( this.showId, this.show );
        }

        _saveText () {
            this._saveData( this.keypath, this.ele.innerHTML );
        }

        _saveData ( keypath, data ) {
            // save data for each memo as JSON? instead of separate keys
            localStorage.setItem( keypath, data );
        }

        loadData () {
            var content = { 'image': 'PASTE IMAGE URL HERE',
                            'scratchpad': 'sharpen them kitty nails',
                            'agenda': 'aka a fancy to do list',
                            'goals': 'HAHAHAHHAHAHAHAHAH'
                          };

            this.ele.innerHTML = localStorage[this.keypath] || content[this.keypath];
            if ( this.show ) { this._show(); }
        }

        deleteData ( keypath ) {
            localStorage.removeItem( this.keypath );
        }
    }



    window.Memos = Memos;
    window.Memo = Memo;

})( window );
