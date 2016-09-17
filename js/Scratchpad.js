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
            this.eleName = name.replace(/ /g, '-');

            this.show = this._loadData( 'show' ) == null ? true : this._loadData( 'show' );
            this.content = this._loadData( 'content' ) || ">>>>> words & stuff <<<<<";

            this.saveData = this._saveData;
            this.loadData = this._loadData;
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
