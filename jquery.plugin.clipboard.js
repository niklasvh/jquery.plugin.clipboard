/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 14.6.2011 
* @website http://hertzen.com
 */


(function( $ ){
    $.fn.clipboard = function(options) {     
        var defaults = {
            prepend: null, // content to prepend to copy selection
            append: null,  // content to append to copy selection
            disable:false,  // disable copying for element
            oncopy: function(content){} // callback on copy event
                            
        };
                    
        var options = $.extend({},defaults,options);
        
        $(this).each(function(i,el){

            el.oncopy = function(e,b){
                if (options.disable){
                    return false;
                }
                if (window.clipboardData && document.selection) { // Internet Explorer
                            
                            
         
                    var s = document.selection;

                    var r = s.createRange();
                    var t = r.htmlText;
                    
                    if (options.prepend!==null){
                        t = options.prepend + t;
                    }
                            
                    if (options.append!==null){
                        t = t + options.append;
                    }
                                
                    options.oncopy(t);
                    
                    if (window.clipboardData.setData ("Text", t)){
                        return false;
                    }
                    
                }else {
                    // the rest (which don't support clipboardData)
                                
                                
                    var s = window.getSelection();
                    var r = s.getRangeAt(0);
                            
                   
                            
                    if (options.append!==null){
                        var a = $('<span />').html(options.append);
                                
                        var tmpr = s.getRangeAt(s.rangeCount-1);
                                

                        var rangeAppend = document.createRange();

                        rangeAppend.setStart(tmpr.endContainer,tmpr.endOffset);
                        rangeAppend.insertNode(a[0]);
                        rangeAppend.setEnd(a[0], a[0].childNodes.length);
                                 
                               
                        window.setTimeout(function(){
                            $(a).remove();
                        },0);  
                                
                    }
                                
                                
                                                     
                    if (options.prepend!==null){
                        var n = $('<span />').html(options.prepend);
                                                                                                               
                        r.insertNode(n[0]);
                            
                        var range = document.createRange();
                        range.setStart(n[0], 0);
                        range.setEnd(n[0], n[0].childNodes.length);
                        s.addRange(range);
                                
                        window.setTimeout(function(){
                            $(n).remove();
                        },0);  
                    }
                            
                    s.removeAllRanges();
                            
                    s.addRange(r);
                    if (options.append!==null){
                        s.addRange(rangeAppend);   
                    }
                    
                    options.oncopy(s.toString());
                }
            };
        });
                    
                    
        return this;
    }
})( jQuery );