( function ( window ) {

    class List {
        constructor ( properties ) {
            this.keypath = properties.keypath;
            this.ele = document.getElementById( properties.id );

            // bind on blur to saveData()
            this.saveData = this._saveData
            this.ele.addEventListener( 'blur', this.saveData.bind( this ) );
        }

        _saveData () {
            localStorage.setItem( this.keypath, this.ele.innerHTML );
        }

        loadData () {
            this.ele.innerHTML = localStorage[this.keypath];
        }

        deleteData ( keypath ) {
            localStorage.removeItem( this.keypath );
        }
    }
    
    window.List = List;

})( window );
