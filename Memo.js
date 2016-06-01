( function ( module ) {
    class Memos {
        constructor () {
            this.all = [];
        }

        addMemo ( memo ) {
            // TODO deal with duplicates... & unfriendly symbols?
            this.all.push( memo.name );
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
            var index = this.all.indexOf( memo.name );
            this.all.splice( index, 1 );
            this.saveMemos();
        }
    }

    class Memo {
        constructor ( name ) {
            this.name = name;
            // TODO create html safe name

            this.show = this._loadData( 'show' ) || true;
            this.content = this._loadData( 'content' ) || 'rand0m yeaH';

            this.saveData = this._saveData;
            this.loadData = this._loadData;
        }

        bindElement ( ele ) {
            this.ele = ele;
        }

        _saveData ( keypath, newData ) {
            this[keypath] = newData;

            var data = { content: this.content, show: this.show };
            setData( this.name, data );
        }

        _loadData ( keypath ) {
            var data = getData( this.name );
            return data[keypath];
        }

        deleteData ( name ) {
            localStorage.removeItem( this.name );
        }
    }

    function setData ( keypath, data ) {
        localStorage.setItem( keypath, JSON.stringify( data ) );
    }

    function getData ( keypath ) {
        var data = {};

        if ( localStorage[keypath] ) {
            data = JSON.parse( localStorage[keypath] );
        }

        return data;

    }

    module.Memos = Memos;
    module.Memo = Memo;

})( window );
