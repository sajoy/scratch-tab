( function ( window ) {

    class Memo {
        constructor ( keypath ) {
            this.keypath = keypath;

            this.toggleId = 'toggle-' + this.keypath;
            this.contentId = this.keypath[0] + '-content';
            this.showId = this.keypath + 'show';

            this.ele = document.getElementById( this.contentId );
            this.switch = document.getElementById( this.toggleId );

            this.show = localStorage[this.showId] ? JSON.parse(localStorage[this.showId]) : false;

            this.saveText = this._saveText;
            this.ele.addEventListener( 'blur', this.saveText.bind( this ) );

            this.toggle = this._toggle;
            this.switch.addEventListener( 'click', this.toggle.bind( this) );
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

    window.Memo = Memo;

})( window );