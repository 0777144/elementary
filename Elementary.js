(function(window, undefined) {

    var Elementary = function ( selector) {
        return new Elementary.fn.init( selector );
    };

    var classAction = function (classNames, action) {
        //if ( typeof classNames === "string" ) throw new Error('Class names must be string');
        //if ( classNames == "" ) throw new Error("Class can't be empty");
        var self = this;
        classNames
            .split(' ')
            .forEach(className => {
                for(let i=0; i<self.length; i++)
                    self[i].classList[action](className);
            });
        return this;
    };

    var hasClass = function (element, classNames) {
        var classes = classNames.split(' '),
            n = classes.length,                                         // классы могут быть в разной последовательности
            regClassNames = `(${classes.join('|')}) `.repeat(n).trim(); // таким образом каждый класс может оказаться на
                                                                        // на каждом месте: one two three
                                                                        // two one three ...
        return new RegExp('(^| )' + regClassNames + '( |$)', 'gi').test(element.className);
    };

    Elementary.fn = Elementary.prototype = {
        init: function( selector ) {
            this.length = 0;
            var tmp = [],
                n,
                elements;
            if ( typeof selector === "string" ) {
                if(selector == 'body') {
                    this[0] = document.body;
                    return this;
                }

                // E('tag:num') вернуть определенный элемент
                if( /.*:-?\d+$/.test(selector) ) {
                    tmp = selector.split(':')
                    n = tmp[1];
                    selector = tmp[0];
                }

                elements = document.querySelectorAll( selector );
                if(n !== undefined) {
                    if( n == '-0' ) throw new Error(`Selector :n can't be '-0'`);// чтобы не было путаницы с -0
                    n = n >= 0 ? n : elements.length + parseInt(n);
                    this[0] =  elements[n];
                    this.length = 1;
                    return this;
                } else {
                    for(let i=0; i<elements.length; i++){
                        this[i] = elements[i];
                    }
                    this.length = elements.length;
                    return this;
                }
            } else {
                throw new Error('Selector must be string.')
            }
        },
        addClass( classNames ) {
            return classAction.apply(this,[classNames,'add']);
        },
        removeClass( classNames ) {
            return classAction.apply(this,[classNames,'remove']);
        },
        toggleClass( classNames ) {
            return classAction.apply(this,[classNames,'toggle']);
        },
        hasClass( className, allElementsHas ) {
            allElementsHas = allElementsHas || false;
            if(className == "") return false;

            //Если достаточно найти хотябы один элемент содержащий нужные классы
            if(!allElementsHas) {
                for(let i=0; i<this.length; i++) {
                    if(hasClass(this[i],className)) return true;
                }
                return false;
            } else {//Если хоть один элемент не содержит нужных классов
                for(let i=0; i<this.length; i++) {
                    if(!hasClass(this[i],className)) return false;
                }
                return true;
            }
        },
        html( content ) {
            if (arguments.length == 0) return this[0].innerHTML;

            for(let i=0; i<this.length; i++) {
                 this[i].innerHTML = content;
            }
            return this;
        }
    };

    Elementary.fn.init.prototype = Elementary.fn;
    window.Elementary = window.E = Elementary;
})(window);