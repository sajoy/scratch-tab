( function ( window ) {


    class Scratchpad {
        constructor () {
            this.action = null;
            this.styles = {};
        }
    }

    class Memos {
        constructor () {
            this.all = getData( 'memos' ) || [];
        }

        addMemo ( memo ) {
            // TODO deal with duplicates... & unfriendly symbols?
            this.all.push( memo.name );
            this.saveMemos();
        }

        saveMemos () {
            setData( 'memos', this.all );
        }

        deleteMemo ( memo ) {
            var index = this.all.indexOf( memo.name );
            if ( index !== -1 ) {
                this.all.splice( index, 1 );
                this.saveMemos();
                deleteData( memo.name );
            }
        }
    }

    class Memo {
        constructor ( name ) {
            this.name = name;
            // TODO create html safe name

            this.show = this._loadData( 'show' ) !== null ? this._loadData( 'show' ) : true;
            this.content = this._loadData( 'content' ) || 'rand0m yeaH';
            // TODO add random starter strings

            this.saveData = this._saveData;
            this.loadData = this._loadData;

            // TODO on very first load, have hello memo
        }

        bindElement ( name, ele ) {
            this[name] = ele;
        }

        _saveData ( keypath, newData ) {
            this[keypath] = newData;

            var data = { content: this.content, show: this.show };
            setData( this.name, data );
        }

        _loadData ( keypath ) {
            var data = getData( this.name ) || {};
            return data[keypath];
        }

    }

    // TODO create Data class?

    function setData ( keypath, data ) {
        localStorage.setItem( keypath, JSON.stringify( data ) );
    }

    function getData ( keypath ) {
        var data = null;

        if ( localStorage[keypath] ) {
            data = JSON.parse( localStorage[keypath] );
        }

        return data;
    }

    function deleteData ( keypath ) {
        localStorage.removeItem( keypath );
    }

    var app = new Scratchpad();
    window.app = app;
    app.Memos = Memos;
    app.Memo = Memo;

})( window );
