( function ( module ) {
    class Memos {
        constructor () {
            this.all = [];
        }

        addMemo ( memo ) {
            // TODO deal with duplicates... & unfriendly symbols?
            this.all.push( memo.keypath );
            this.saveMemos();
        }

        saveMemos () {
            localStorage.setItem( 'memos', JSON.stringify( this.all ) );
        }

        getMemos () {
            this.all = localStorage['memos'] ? JSON.parse( localStorage['memos'] ) : [];
            return this.all;
        }

        deleteMemo ( memo ) {
            var index = this.all.indexOf( memo.keypath );
            this.all.splice( index, 1 );
            this.saveMemos();
        }
    }

    class Memo {
        constructor ( keypath ) {
            this.keypath = keypath;
            // TODO create html safe keypath
            this.saveText = this._saveText;
            this.toggle = this._toggle;
        }

        bindElement ( ele ) {
            this.ele = ele;
        }

        _show () {
            this.ele.parentElement.classList.add( 'show' );
        }

        _toggle () {
            // TODO fix toggle
            if ( this.show ) {
                this.ele.parentElement.classList.remove( 'show' );
                this.show = false;
            }
            else {
                this._show();
                this.show = true;
            }
            this._saveData( this.showId, JSON.stringify( this.show ) );
        }

        _saveText () {
            this._saveData( this.keypath, this.ele.innerHTML );
        }

        _saveData ( keypath, data ) {
            var d = {
                content: data,
                show: this.show,
            }
            localStorage.setItem( keypath, JSON.stringify( d ) );
        }

        loadData () {
            var loadedData = { content: 'random is c00l' };
            
            if ( localStorage[this.keypath] ) {
                loadedData = JSON.parse( localStorage[this.keypath] );
            }

            this.ele.innerHTML = loadedData.content;
            if ( loadedData.show ) { this._show(); }
        }

        deleteData ( keypath ) {
            localStorage.removeItem( this.keypath );
        }
    }

    module.Memos = Memos;
    module.Memo = Memo;

})( window );
